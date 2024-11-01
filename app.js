const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
require("./src/libs/hbs-helper");
const config = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./src/views"));

app.use("/assets", express.static(path.join(__dirname, "./src/assets")));

app.use(express.urlencoded({ extended: true }));

app.get("/", home);
app.get("/contact", contact);
app.get("/testimonial", testimonial);

// PROJECT
app.get("/", project);
app.get("/project", project);
app.post("/project", projectPost);
app.post("/delete-project/:id", projectDelete);
app.get("/edit-project/:id", editproject);
app.post("/edit-project/:id", editprojectPost);
app.get("/project-detail/:id", projectDetail);

const projects = [];

function home(req, res) {
  res.render("index");
}

async function home(req, res) {
  const query = `SELECT * FROM tb_projects`;
  let projects = await sequelize.query(query, { type: QueryTypes.SELECT });
  projects = projects.map((project) => ({
    ...project,
    technologies: project.technologies.replace(/[{}]/g, "").split(","),
  }));

  res.render("index", { projects });
}

async function project(req, res) {
  const query = `SELECT * FROM tb_projects`;
  let projects = await sequelize.query(query, { type: QueryTypes.SELECT });
  projects = projects.map((project) => ({
    ...project,
    technologies: project.technologies.replace(/[{}]/g, "").split(","), // Mengubah string menjadi array
  }));

  res.render("project", { projects });
}

function contact(req, res) {
  res.render("contact");
}

function testimonial(req, res) {
  res.render("testimonial");
}

async function projectDetail(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM tb_projects WHERE id = ${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });

  // Format the technologies into an array
  project[0].technologies = project[0].technologies
    .replace(/[{}]/g, "")
    .split(",");

  project[0].author = "Surya Elidanto";
  res.render("project-detail", { project: project[0] });
}

async function projectPost(req, res) {
  const {
    project_name,
    start_date,
    end_date,
    description,
    technologies,
    image,
  } = req.body;

  const query = `INSERT INTO tb_projects(project_name, start_date, end_date, description, technologies, image) VALUES ('${project_name}','${start_date}','${end_date}','${description}','${technologies}','https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600')`;

  await sequelize.query(query, { type: QueryTypes.INSERT });

  res.redirect("/");
}

async function projectDelete(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM tb_projects WHERE id=${id}`;
  await sequelize.query(query, { type: QueryTypes.DELETE });

  res.redirect("/");
}

async function editproject(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM tb_projects WHERE id=${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });
  project[0].author = "Surya Elidanto";

  res.render("edit-project", { project: project[0] });
}

async function editprojectPost(req, res) {
  const { id } = req.params;

  const {
    project_name,
    start_date,
    end_date,
    description,
    technologies,
    image,
  } = req.body;

  const query = `UPDATE tb_projects SET project_name='${project_name}',start_date='${start_date}',end_date='${end_date}',description='${description}',technologies='${technologies}',image='https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE id=${id}`;
  await sequelize.query(query, { type: QueryTypes.UPDATE });

  res.redirect("/");
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

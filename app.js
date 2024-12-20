const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
require("./src/libs/hbs-helper");
const config = require("./config/config");
const { Sequelize, QueryTypes } = require("sequelize");

const bcrypt = require("bcrypt");
const session = require("express-session");
const MemoryStore = require('memorystore')(session); // Import memorystore
const flash = require("express-flash");
const upload = require("./src/middleware/upload-file");

require("dotenv").config()

const environment = process.env.NODE_ENV

const sequelize = new Sequelize(config[environment]);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./src/views"));

app.use("/assets", express.static(path.join(__dirname, "./src/assets")));
app.use("/uploads", express.static(path.join(__dirname, "./")));

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: "my-session",
    secret: "kelapamiringlarilurus", // Gantilah secret ini dengan nilai yang lebih aman
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
      checkPeriod: 86400000, // Periksa dan hapus entri sesi yang sudah kedaluwarsa setiap 24 jam
    }),
    cookie: {
      secure: false, // Untuk HTTPS, ganti menjadi true
      maxAge: 1000 * 60 * 60 * 24, // Sesi kedaluwarsa dalam 1 hari
    },
  })
);
app.use(flash());

app.get("/", home);
app.get("/contact", contact);
app.get("/testimonial", testimonial);
app.get("/login", login);
app.get("/register", register);
app.post("/registerPost", registerPost);
app.post("/loginPost", loginPost);

// PROJECT
app.get("/project", project);
app.post("/project", upload.single("image"), projectPost);
app.post("/delete-project/:id", projectDelete);
app.get("/edit-project/:id", editproject);
app.post("/edit-project/:id", upload.single("image-update"), editprojectPost);
app.get("/project-detail/:id", projectDetail);
app.post("/logout", logout);

function login(req, res) {
  res.render("login");
}

function register(req, res) {
  res.render("register");
}
async function registerPost(req, res) {
  const { name, email, password } = req.body;
  const salt = 10;

  const hashedPassword = await bcrypt.hash(password, salt);

  const query = `INSERT INTO users(name, email, password) VALUES('${name}', '${email}', '${hashedPassword}')`;
  await sequelize.query(query, { type: QueryTypes.INSERT });

  res.redirect("login");
}

async function loginPost(req, res) {
  const { email, password } = req.body;

  // verifikasi email
  const query = `SELECT * FROM users WHERE email='${email}'`;
  const user = await sequelize.query(query, { type: QueryTypes.SELECT });

  if (!user.length) {
    req.flash("error", "Email / password salah!");
    return res.redirect("/login");
  }

  const isVerifiedPassword = await bcrypt.compare(password, user[0].password);

  if (!isVerifiedPassword) {
    req.flash("error", "Email / password salah!");
    return res.redirect("/login");
  }

  req.flash("success", "Berhasil Login!");
  req.session.user = user[0];

  res.redirect("/");
}

function logout(req, res) {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
}

async function home(req, res) {
  const user = req.session.user;

  let query;

  // Jika pengguna sudah login, tampilkan proyek yang dibuat oleh pengguna tersebut
  if (user) {
    query = `SELECT tb_projects.*, users.name AS name FROM tb_projects LEFT JOIN users ON tb_projects.user_id = users.id WHERE tb_projects.user_id = ${user.id}`;
  } else {
    // Jika pengguna belum login, tampilkan semua proyek
    query = `SELECT tb_projects.*, users.name AS name FROM tb_projects LEFT JOIN users ON tb_projects.user_id = users.id`;
  }

  let projects = await sequelize.query(query, { type: QueryTypes.SELECT });

  // Mengolah data proyek untuk memastikan 'technologies' dalam format array
  projects = projects.map((project) => ({
    ...project,
    technologies: project.technologies
      ? project.technologies.replace(/[{}]/g, "").split(",")
      : [], // Menangani kemungkinan tidak ada teknologi
  }));

  res.render("index", { projects, user });
}

async function project(req, res) {
  const query = `SELECT * FROM tb_projects`;
  let projects = await sequelize.query(query, { type: QueryTypes.SELECT });
  projects = projects.map((project) => ({
    ...project,
    technologies: project.technologies.replace(/[{}]/g, "").split(","), // Mengubah string menjadi array
  }));
  const user = req.session.user;
  if (!user) {
    return res.redirect("/login");
  }
  res.render("project", { projects, user });
}

function contact(req, res) {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/login");
  }

  res.render("contact");
}

function testimonial(req, res) {
  res.render("testimonial");
}

async function projectDetail(req, res) {
  const { id } = req.params;

  const query = `
    SELECT tb_projects.*, users.name AS author 
    FROM tb_projects 
    LEFT JOIN users ON tb_projects.user_id = users.id 
    WHERE tb_projects.id = ${id}
  `;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });

  if (project.length > 0) {
    project[0].technologies = project[0].technologies
      .replace(/[{}]/g, "")
      .split(",");
    res.render("project-detail", { project: project[0] });
  } else {
    res.status(404).send("Project not found");
  }
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

  const { id } = req.session.user;

  console.log("file yang sudah user upload", req.file);

  const imagePath = req.file.path;

  const query = `INSERT INTO tb_projects(project_name, start_date, end_date, description, technologies, image, user_id) VALUES ('${project_name}','${start_date}','${end_date}','${description}','${technologies}','${imagePath}',${id})`;
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
  const user = req.session.user;

  const { id } = req.params;
  const query = `SELECT * FROM tb_projects WHERE id=${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("edit-project", { project: project[0] });
}

async function editprojectPost(req, res) {
  const { id } = req.params;

  const imagePath= req.file.path

  const {
    project_name,
    start_date,
    end_date,
    description,
    technologies,
    image,
  } = req.body;


  const query = `UPDATE tb_projects SET project_name='${project_name}',start_date='${start_date}',end_date='${end_date}',description='${description}',technologies='${technologies}',image='${imagePath}' WHERE id=${id}`;
  await sequelize.query(query, { type: QueryTypes.UPDATE });

  res.redirect("/");
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

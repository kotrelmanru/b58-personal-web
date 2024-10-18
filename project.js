const form = document.getElementById("project-form");
const projectNameInput = document.getElementById("project-name");
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");
const descriptionInput = document.getElementById("description");
const technologies = {
  NodeJs: document.getElementById("NodeJs"),
  Reactjs: document.getElementById("ReactJs"),
  NextJs: document.getElementById("NextJs"),
  TypeScript: document.getElementById("TypeScript"),
};
const uploadButton = document.getElementById("upload-button");
const inputBlogImage = document.getElementById("input-blog-image");
const uploadLabel = document.querySelector(".upload-label");
const cardContainer = document.getElementById("card-container");

let imageFile = null;
let editMode = false;
let editCardIndex = null;

uploadButton.addEventListener("click", (e) => {
  e.preventDefault();
  inputBlogImage.click();
});

inputBlogImage.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    imageFile = file;
    uploadLabel.textContent = file.name;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const projectName = projectNameInput.value;
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);
  const description = descriptionInput.value;

  const durationMonths = Math.ceil(
    (endDate - startDate) / (1000 * 60 * 60 * 24 * 30)
  );

  const selectedTechnologies = [];
  for (const tech in technologies) {
    if (technologies[tech].checked) {
      selectedTechnologies.push(technologies[tech].id);
    }
  }

  const projectYear = startDate.getFullYear();

  createCard(
    projectName,
    projectYear,
    durationMonths,
    description,
    selectedTechnologies.join(", "),
    imageFile
  );

  form.reset();
  uploadLabel.textContent = "No file chosen";
  imageFile = null;
});

function createCard(
  projectName,
  projectYear,
  durationMonths,
  description,
  selectedTechnologies,
  imageFile
) {
  const cardCount = cardContainer.children.length + 1;
  const card = document.createElement("div");
  card.classList.add("card");

  const imageUrl = imageFile ? URL.createObjectURL(imageFile) : "";

  card.innerHTML = `
        <div class="card-content">
            <img id="card-image-${cardCount}" src="${imageUrl}" alt="Project Image" />
            <div class="card-title" id="card-title-${cardCount}">${projectName}-${projectYear}</div>
            <div class="card-duration" id="card-duration-${cardCount}">durasi: ${durationMonths} bulan</div>
        </div>
        <div class="card-description" id="card-description-${cardCount}">${description}</div>
        <div class="card-technologies" id="card-technologies-${cardCount}">Teknologi: ${selectedTechnologies}</div>
        <div class="button-group">
            <button onclick="editCard(${cardCount})">Edit</button>
            <button onclick="deleteCard(this)">Delete</button>
        </div>
    `;
  cardContainer.appendChild(card);
}

function editCard(cardCount) {
  const card = document.querySelector(`#card-${cardCount}`);
  const title = card.querySelector(`#card-title-${cardCount}`).textContent;
  const duration = card
    .querySelector(`#card-duration-${cardCount}`)
    .textContent.split(" ")[1];
  const description = card.querySelector(
    `#card-description-${cardCount}`
  ).textContent;
  const technologies = card
    .querySelector(`#card-technologies-${cardCount}`)
    .textContent.split(": ")[1]
    .split(", ");

  projectNameInput.value = title;
  descriptionInput.value = description;

  const today = new Date();
  const startDate = new Date(today.getTime() - duration * 24 * 60 * 60 * 1000);
  startDateInput.valueAsDate = startDate;
  endDateInput.valueAsDate = today;

  for (const tech in technologies) {
    document.getElementById(tech).checked = false;
  }
  technologies.forEach((tech) => {
    if (document.getElementById(tech)) {
      document.getElementById(tech).checked = true;
    }
  });

  editMode = true;
  editCardIndex = cardCount;
}

function updateCard(
  cardCount,
  projectName,
  duration,
  description,
  selectedTechnologies,
  imageFile
) {
  const card = document.querySelector(`#card-${cardCount}`);

  card.querySelector(`#card-title-${cardCount}`).textContent = projectName;
  card.querySelector(
    `#card-duration-${cardCount}`
  ).textContent = `Duration: ${duration} days`;
  card.querySelector(`#card-description-${cardCount}`).textContent =
    description;
  card.querySelector(
    `#card-technologies-${cardCount}`
  ).textContent = `Technologies: ${selectedTechnologies}`;

  if (imageFile) {
    const imageUrl = URL.createObjectURL(imageFile);
    card.querySelector(`#card-image-${cardCount}`).src = imageUrl;
  }
}

function deleteCard(button) {
  const card = button.parentElement.parentElement;
  card.remove();
}

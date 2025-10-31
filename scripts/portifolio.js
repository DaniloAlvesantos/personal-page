document.addEventListener("DOMContentLoaded", init);

const skillsAssets = [
  {
    tech: "front-end",
    name: "Frontend",
    color: "#0d6efd",
    icon: "bi-window-fullscreen",
  },
  { tech: "back-end", name: "Backend", color: "#188754", icon: "bi-server" },
  { tech: "mobile", name: "Mobile", color: "#1FC997", icon: "bi-phone" },
  {
    tech: "programming",
    name: "Linguagens",
    color: "#FFC107",
    icon: "bi-terminal",
  },
  { tech: "other", name: "Outros", color: "#FD7E13", icon: "bi-diagram-3" },
  {
    tech: "development-tools",
    name: "Ferramentas",
    color: "#662BF2",
    icon: "bi-gear",
  },
  {
    tech: "AI",
    name: "Inteligência artificial",
    color: "#077990",
    icon: "bi-openai",
  },
];

const getAge = (birthYear = 2006) => new Date().getFullYear() - birthYear;

const autosize = (element) => {
  element.style.height = "auto";
  element.style.height = `${element.scrollHeight}px`;
};

async function init() {
  document.querySelector("#age").textContent = `${getAge()} anos`;

  try {
    const response = await fetch("api/data.json");
    const data = await response.json();

    renderSkills(data.technologies, data.skills);
    renderProjects(data.projects, data.placeholder);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

function renderSkills(technologies, skills) {
  const stacksContainer = document.querySelector("#stacks");
  const fragment = document.createDocumentFragment();

  technologies.forEach((tech) => {
    const asset = skillsAssets.find((a) => a.tech === tech);
    if (!asset) return;

    const relatedSkills = skills.filter((s) => s.category === tech);
    const skillList = relatedSkills.map((s) => `<li>${s.tech}</li>`).join("");

    const card = document.createElement("div");
    card.className = "col-12 col-md-6 col-lg-3";
    card.innerHTML = `
      <div class="card tech-card" style="--bs-card-bg: #111">
        <div class="card-body">
          <div class="tech-card-icon" style="--tech-card-color: ${asset.color}45">
            <i class="bi ${asset.icon} fs-5" style="color: ${asset.color}"></i>
          </div>
          <h5 class="card-title fs-5 fw-bold my-2">${asset.name}</h5>
          <ul style="--tech-card-color: ${asset.color}">${skillList}</ul>
        </div>
      </div>
    `;
    fragment.appendChild(card);
  });

  stacksContainer.appendChild(fragment);
}

function renderProjects(projects, placeholder) {
  const projectsContainer = document.querySelector("#projects-container");
  const fragment = document.createDocumentFragment();

  projects.forEach((project) => {
    const { name, description, picture, url, repository } = project;

    const projectCard = document.createElement("div");
    projectCard.className = "d-flex flex-column gap-2 col-12 col-md-6";
    projectCard.innerHTML = `
      <div class="project-img-container">
        <img src="${
          picture ?? placeholder
        }" alt="${name}" class="project-img" />
      </div>
      <h3 class="fs-4 fw-bold font-display">${name}</h3>
      <p class="text-muted-custom">${description}</p>
      <div class="d-flex align-items-center gap-3 mt-2">
        ${url ? linkHTML(url, "Live Demo", true) : ""}
        ${repository ? linkHTML(repository, "Repository", false) : ""}
      </div>
    `;

    fragment.appendChild(projectCard);
  });

  projectsContainer.appendChild(fragment);
}

const linkHTML = (href, label, isDemo = false) => `
  <a class="text-decoration-none fw-medium small ${
    isDemo
      ? "d-flex align-items-center "
      : "text-muted-custom project-link-hover"
  }"
     href="${href}"
     style="color: var(${isDemo ? "--text-light" : "--text-muted"})">
    ${label}
    ${
      isDemo
        ? `<i class="bi bi-arrow-right-short" style="font-size:1.5rem;"></i>`
        : ""
    }
  </a>
`;

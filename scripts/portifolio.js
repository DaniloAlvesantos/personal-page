let skills;
let projects;
let technologies;

const skillsAssets = [
  {
    tech: "front-end",
    name: "Frontend",
    color: "#0d6efd",
    icon: "bi-window-fullscreen",
  },
  {
    tech: "back-end",
    name: "Backend",
    color: "#188754",
    icon: "bi-server",
  },
  {
    tech: "mobile",
    name: "Mobile",
    color: "#1FC997",
    icon: "bi-phone",
  },
  {
    tech: "programming",
    name: "Linguagens",
    color: "#FFC107",
    icon: "bi-terminal",
  },
  {
    tech: "other",
    name: "Outros",
    color: "#FD7E13",
    icon: "bi-diagram-3",
  },
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

const getAge = () => {
  const birthAge = 2006;
  const currentYear = new Date().getFullYear();

  return currentYear - birthAge;
};

const age = (document.querySelector("#age").innerHTML = getAge() + " anos");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("api/data.json", {
    method: "GET",
  })
    .then((d) => d.json())
    .then((data) => data);

  skills = response.skills;
  projects = response.projects;
  technologies = response.technologies;
  console.log(skills);

  const stacksContainer = document.querySelector("#stacks");

  technologies.forEach((tech) => {
    const currentAsset = skillsAssets.find((r) => r.tech === tech);
    const currentSkills = skills.filter((skill) => skill.category === tech);
    const content = `
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card tech-card" style="--bs-card-bg: #111">
          <div class="card-body">
              <div class="tech-card-icon" style="--tech-card-color: ${
                currentAsset.color + 45
              }">
                  <i class="bi ${currentAsset.icon} fs-5" style="color: ${
      currentAsset.color
    }"></i>
                </div>
                <h5 class="card-title fs-5 fw-bold my-2">${
                  currentAsset.name
                }</h5>
                <ul id="tech-card-list" style="--tech-card-color: ${
                  currentAsset.color
                }">
                  ${currentSkills
                    .map((skill) => {
                      return `<li>${skill.tech}</li>`;
                    })
                    .join("")}
                </ul>
              </div>
            </div>
          </div>`;

    stacksContainer.innerHTML += content;
  });
});

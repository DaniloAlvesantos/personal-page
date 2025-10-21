let skills;
let projects;

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
});

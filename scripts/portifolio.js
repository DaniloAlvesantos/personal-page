const getAge = () => {
  const birthAge = 2006;
  const currentYear = new Date().getFullYear();

  return currentYear - birthAge;
};

const age = (document.querySelector("#age").innerHTML = getAge() + " anos");

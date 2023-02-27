const icon = document.querySelector(".bi-chevron-down");

const navMenu = document.querySelector("nav");

menuChange = () => {
  if (navMenu.style.display === "none") {
    navMenu.style.display = "flex";
  } else {
    navMenu.style.display = "none";
  }
};

iconChange = () => {
  if (navMenu.style.display === "none") {
    icon.style.transform = "rotate(180deg)";
    icon.style.transformOrigin = "center";
  } else {
    icon.style.transform = "";
    icon.style.transformOrigin = "";
  }
};

navMenu.style.display = "none";
function hamburgerClick() {
  iconChange();
  menuChange();
}

icon.addEventListener("click", hamburgerClick);

const year = document.querySelector(".copyright > span");

year.innerHTML = new Date().getFullYear();

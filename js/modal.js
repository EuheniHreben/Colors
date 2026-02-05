const sideBar = document.getElementById("sideBar");
const openNav = document.getElementById("openNav");
const wrapper = document.querySelector(".wrapper");
const overlay = document.querySelector(".overlay");

function openSideBar() {
  sideBar.classList.add("active");
  openNav.classList.add("active");
  overlay.classList.add("active");
  wrapper.classList.add("blur");
}

function closeSideBar() {
  sideBar.classList.remove("active");
  openNav.classList.remove("active");
  overlay.classList.remove("active");
  wrapper.classList.remove("blur");
}

openNav.addEventListener("click", (e) => {
  e.preventDefault();
  openSideBar();
});

overlay.addEventListener("click", closeSideBar);

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    closeSideBar();
  }
});

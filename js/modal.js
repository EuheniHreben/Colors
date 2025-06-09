const sideNav = document.getElementById("sideBar");
const openNav = document.getElementById("openNav");
const wrapper = document.querySelector(".wrapper");

function closeSideBar() {
  sideNav.classList.remove("active");
  sideNav.style.right = "-300px";
  openNav.style.right = "0px";
  wrapper.classList.remove("blur");
}

openNav.addEventListener("click", (e) => {
  e.preventDefault();
  sideNav.classList.add("active");
  sideNav.style.right = "0px";
  openNav.style.right = "-150px";
  wrapper.classList.add("blur");
});

sideNav.addEventListener("click", (e) => {
  e.preventDefault();
  closeSideBar();
});

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 27) {
    closeSideBar();
  }
});

document.addEventListener("click", function (e) {
  if (sideNav.classList.contains("active")) {
    if (
      e.target.classList.contains("col") ||
      e.target.parentNode.classList.contains("col")
    ) {
      closeSideBar();
    }
  }
});

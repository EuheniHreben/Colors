const cols = document.querySelectorAll(".col");
const screenWidth = window.screen.width;

function randomGenerator() {
  const hexCodes = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return "#" + color;
}

function randomColor() {
  cols.forEach((col) => {
    const text = col.querySelector("h2");
    const randomColor = randomGenerator();
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    if (isLocked) {
      return;
    }
    text.textContent = randomColor;
    col.style.background = randomColor;
  });

  if (cols.length === 2 || window.innerWidth < 700) {
    const c1Bg = cols[0].style.background;
    const c2Bg = cols[1].style.background;
    cols[0].querySelector("h2").style.color = c2Bg;
    cols[1].querySelector("h2").style.color = c1Bg;
  }
}

function clickCopy(text) {
  const content = document.createElement("div");
  content.classList.add("copy");
  content.innerHTML = "Color saved";
  wrapper.appendChild(content);
  return navigator.clipboard.writeText(text);
}

randomColor();

if (screenWidth < 700) {
  document.addEventListener("touchstart", (event) => {
    const type = event.target.dataset.type;
    if (type === "lock") {
      const node =
        event.target.tagName.toLowerCase() === "i"
          ? event.target
          : event.target.children[0];
      node.classList.toggle("fa-lock-open");
      node.classList.toggle("fa-lock");
    } else if (type === "copy") {
      clickCopy(event.target.textContent);
    } else {
      randomColor();
    }
  });
} else {
  document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.code.toLowerCase() === "space") {
      randomColor();
    }
  });

  document.addEventListener("click", (event) => {
    const type = event.target.dataset.type;
    if (type === "lock") {
      const node =
        event.target.tagName.toLowerCase() === "i"
          ? event.target
          : event.target.children[0];
      node.classList.toggle("fa-lock-open");
      node.classList.toggle("fa-lock");
    } else if (type === "copy") {
      clickCopy(event.target.textContent);
    }
  });
}

const selectButtons = document.querySelectorAll(".select-number");

selectButtons.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    cols.forEach((col, colIndex) => {
      col.style.display = colIndex <= index + 1 ? "flex" : "none";
    });
  });
});

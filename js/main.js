const sideBar = document.getElementById("sideBar");
const openNav = document.getElementById("openNav");
const wrapper = document.querySelector(".wrapper");
const overlay = document.querySelector(".overlay");
const selectButtons = document.querySelectorAll(".select-number");
const columns = document.querySelectorAll(".col");
const shuffleBtn = document.querySelector(".shuffle-colors");
const refreshIcon = document.querySelector(".refresh");
const closeBtn = document.querySelector(".closeBtn");

const mobileQuery = window.matchMedia("(max-width: 700px)");

let angle = 0;
let canRefresh = true;
let canCopy = true;

const STORAGE_KEY = "colors-columns";
const REFRESH_DELAY = 600;
const COPY_DELAY = 1000;

/* =======================
   Utils
======================= */

function randomGenerator() {
  const hexCodes = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return "#" + color;
}

/* =======================
   Core logic
======================= */

function randomColor() {
  columns.forEach((col) => {
    if (!col.classList.contains("is-visible")) return;

    const text = col.querySelector("h2");
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    if (isLocked) return;

    const color = randomGenerator();
    text.textContent = color;
    col.style.background = color;
  });

  const visibleCols = [...columns].filter((col) =>
    col.classList.contains("is-visible"),
  );

  if (mobileQuery.matches && visibleCols.length === 2) {
    const [col1, col2] = visibleCols;

    const bg1 = col1.style.background;
    const bg2 = col2.style.background;

    col1.querySelector("h2").style.color = bg2;
    col2.querySelector("h2").style.color = bg1;
  } else {
    visibleCols.forEach((col) => {
      col.querySelector("h2").style.color = "";
    });
  }
}

function refreshAction() {
  randomColor();
  angle += 360;
  refreshIcon.style.setProperty("--angle", `${angle}deg`);
}

function throttledRefresh() {
  if (!canRefresh) return;

  canRefresh = false;
  refreshAction();

  setTimeout(() => {
    canRefresh = true;
  }, REFRESH_DELAY);
}

function clickCopy(text) {
  if (!canCopy) return;

  canCopy = false;

  const content = document.createElement("div");
  content.classList.add("copy");
  content.textContent = "Color saved";
  wrapper.appendChild(content);

  navigator.clipboard.writeText(text);

  setTimeout(() => {
    canCopy = true;
  }, COPY_DELAY);
}

/* =======================
   Layout
======================= */

function setColumns(count) {
  columns.forEach((col, i) => {
    col.classList.toggle("is-visible", i < count);
  });
}

function applyLayout(isMobile) {
  setColumns(isMobile ? 2 : 5);
}

/* =======================
   Sidebar
======================= */

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

/* =======================
   Interaction (UNIFIED)
======================= */

function handleInteraction(e) {
  if (e.pointerType === "touch" && e.isPrimary === false) return;

  // ❌ если тап по интерактивному элементу — выходим
  if (e.target.closest("[data-type]")) return;

  if (e.target.closest("button") || e.target.closest(".sideBar")) return;
  if (!mobileQuery.matches) return;

  throttledRefresh();
}

/* =======================
   Events
======================= */

// универсально: мышь + тач + стилус
document.addEventListener("pointerdown", handleInteraction);

// клавиатура
document.addEventListener("keydown", (e) => {
  if (e.code !== "Space" || e.repeat) return;
  e.preventDefault();
  throttledRefresh();
});

// sidebar
openNav.addEventListener("click", (e) => {
  e.preventDefault();
  openSideBar();
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closeSideBar();
});

overlay.addEventListener("click", closeSideBar);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSideBar();
});

// выбор колонок
selectButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const count = Number(btn.dataset.columns);

    setColumns(count);
    localStorage.setItem(STORAGE_KEY, count);

    closeSideBar();
  });
});

document.addEventListener("click", (e) => {
  const type = e.target.dataset.type;

  if (type === "lock") {
    const node =
      e.target.tagName.toLowerCase() === "i"
        ? e.target
        : e.target.querySelector("i");

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  }

  if (type === "copy") {
    clickCopy(e.target.textContent);
  }
});

shuffleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  throttledRefresh();
});

/* =======================
   Responsive
======================= */

mobileQuery.addEventListener("change", (e) => {
  applyLayout(e.matches);
});

applyLayout(mobileQuery.matches);

const savedColumns = Number(localStorage.getItem(STORAGE_KEY));

if (savedColumns >= 2 && savedColumns <= 5) {
  setColumns(savedColumns);
} else {
  applyLayout(mobileQuery.matches);
}

randomColor();

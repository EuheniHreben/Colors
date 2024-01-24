const cols = document.querySelectorAll('.col');
const info = document.querySelector('.wrapper');
const screenWidth = window.screen.width;

if (screenWidth<480) {
  document.addEventListener('touchstart', (event) => {
    const type = event.target.dataset.type;
    if (type === 'lock') {
      const node = event.target.tagName.toLowerCase() === 'i'
      ? event.target
      : event.target.children[0]
      node.classList.toggle('fa-lock-open')
      node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
      clickCopy(event.target.textContent);
    } else {
      randomColor();
    }
  })
} else {
  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code.toLowerCase() === 'space') {
      randomColor();
    }
  })
  document.addEventListener('click', (event) => {
    const type = event.target.dataset.type;
    if (type === 'lock') {
      const node = event.target.tagName.toLowerCase() === 'i'
      ? event.target
      : event.target.children[0]
      node.classList.toggle('fa-lock-open')
      node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
      clickCopy(event.target.textContent);
    }
  })
}

function randomGenerator() {
  const hexCodes = '0123456789ABCDEF';
  let color = '';
  for (let i=0; i<6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return '#' + color;
}

function randomColor() {
  const c1 = document.getElementById('col1');
  const c2 = document.getElementById('col2');
  const h1 = document.getElementById('col-h1');
  const h2 = document.getElementById('col-h2');

  cols.forEach(function(col) {
    const text = col.querySelector('h2');
    const randomColor = randomGenerator();
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    if (isLocked) {
      return;
    }
    text.textContent = randomColor;
    col.style.background = randomColor;
  })
  if (screenWidth<480) {
    h1.style.color = c2.style.background;
    h2.style.color = c1.style.background;
  }
}

function clickCopy(text) {
  const content = document.createElement('div');
  content.classList.add('copy');
  content.innerHTML = 'Copied';
  info.appendChild(content);
  return navigator.clipboard.writeText(text);
}

randomColor();

const select2 = document.querySelector('.select--2');
const select3 = document.querySelector('.select--3');
const select4 = document.querySelector('.select--4');
const select5 = document.querySelector('.select--5');

function selector () {
  let c2 = cols[2].style.background;
  let c3 = cols[3].style.background;
  let c4 = cols[4].style.background;
  select5.addEventListener('click', (e) => {
    e.preventDefault();
    cols[2].style='display:flex';
    cols[2].style.background = c2;
    cols[3].style='display:flex';
    cols[3].style.background = c3;
    cols[4].style='display:flex';
    cols[4].style.background = c4;
  })
  select4.addEventListener('click', (e) => {
    e.preventDefault();
    cols[2].style='display:flex';
    cols[2].style.background = c2;
    cols[3].style='display:flex';
    cols[3].style.background = c3;
    cols[4].style='display:none';
  })
  select3.addEventListener('click', (e) => {
    e.preventDefault();
    cols[2].style='display:flex';
    cols[2].style.background = c2;
    cols[3].style='display:none';
    cols[4].style='display:none';
  })
  select2.addEventListener('click', (e) => {
    e.preventDefault();
    cols[2].style='display:none';
    cols[3].style='display:none';
    cols[4].style='display:none';
  })
}

selector();
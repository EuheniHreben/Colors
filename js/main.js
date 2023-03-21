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
  const c1 = document.getElementById('c1');
  const c2 = document.getElementById('c2');
  const h1 = document.getElementById('h1');
  const h2 = document.getElementById('h2');
  cols.forEach(function(col) {
    const text = col.querySelector('h2');
    const button = col.querySelector('button');
    const color = randomGenerator();
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    if (isLocked) {
      return;
    }
    text.textContent = color;
    col.style.background = randomGenerator();
  })
  if (screenWidth<480) {
    h1.style.color = c2.style.background;
    h2.style.color = c1.style.background;
  }
}

function clickCopy(text) {
  const content = document.createElement('div');
  content.classList.add('copy');
  content.innerHTML = 'скопировано';
  info.appendChild(content);
  return navigator.clipboard.writeText(text);
}

randomColor();
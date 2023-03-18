const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
  if (event.code.toLowerCase() === 'space') {
    randomColor();
  }
})

document.addEventListener('touchstart', (event) => {
  randomColor();
})

function randomGenerator() {
  const hexCodes = '0123456789ABCDEF';
  let color = '';
  for ( let i=0; i<6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return '#' + color;
}

function randomColor() {
  cols.forEach(function(col) {
    const text = col.querySelector('h2');
    const button = col.querySelector('button');
    const color = randomGenerator();
    text.textContent = color;
    col.style.background = randomGenerator();
    textColor(text, color);
    textColor(button, color);
  })
}

function textColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > .5 ? 'black' : 'white';
}

randomColor();
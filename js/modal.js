let sideNav = document.getElementById('side');
let openNav = document.getElementById('open');

openNav.addEventListener('click', (e) => {
  e.preventDefault()
  sideNav.classList.add('active');
  sideNav.style.right = "0px";
  openNav.style.right = "-150px";  
})

sideNav.addEventListener('click', (e) => {
  e.preventDefault()
  sideNav.classList.remove('active');
  sideNav.style.right = "-300px";
  openNav.style.right = "0px";
})

document.addEventListener('keydown', function(e) {
  if( e.keyCode == 27 ){ 
    sideNav.classList.remove('active');
    sideNav.style.right = "-300px";
    openNav.style.right = "0px";
	}
});

document.addEventListener('click', function(e) {
  console.log(e.target);
  if (sideNav.classList.contains('active')) {
    if (e.target.classList.contains('col') || e.target.parentNode.classList.contains('col')) {
      sideNav.classList.remove('active');
      sideNav.style.right = "-300px";
      openNav.style.right = "0px";
    }
  }
})

let modal = document.getElementById("mySidenav");
let openBtn = document.querySelector('.openNav');

function openNav() {
  modal.classList.add('active');
  modal.style.right = "0px";
  openBtn.style.right = "-50px";  
}

function closeNav() {
  modal.classList.remove('active');
  modal.style.right = "-300px";
  openBtn.style.right = "0px";
}

document.addEventListener('keydown', function(e) {
  if( e.keyCode == 27 ){ 
    modal.classList.remove('active');
    modal.style.right = "-300px";
    openBtn.style.right = "0px";
	}
});

document.addEventListener('click', function(e) {
  console.log(e.target);
  if (modal.classList.contains('active')) {
    if (e.target.classList.contains('col') || e.target.parentNode.classList.contains('col')) {
      modal.classList.remove('active');
      modal.style.right = "-300px";
      openBtn.style.right = "0px";
    }
  }
})
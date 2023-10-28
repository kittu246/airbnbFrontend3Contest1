
// console.log(searchButton);

searchButton.addEventListener('click',() => {
  // console.log(city.value,checkIn.value,checkOut.value,guest.value);
  let url =`search.html?location=${city.value}&checkIn=${checkIn.value}&checkOut=${checkOut.value}&guests=${guest.value}`;
  let link=document.createElement('a');
  link.href=url;
  link.click();
})






let menuButton = document.getElementById("menu");

menuButton.addEventListener("click", showMenuItems);

let rightmenu = document.getElementById("rightSlide");

console.log(rightmenu);

function showMenuItems() {
  rightmenu.className = "show";
}

let closeIcon = rightmenu.children[1].children[0];
// console.log(closeIcon);
closeIcon.addEventListener("click", closemenubar);
function closemenubar() {
  rightmenu.className = "hide";
}










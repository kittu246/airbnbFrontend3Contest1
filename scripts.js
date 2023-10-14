let menuButton = document.getElementById("menu");

menuButton.addEventListener("click",showMenuItems);


let rightmenu = document.getElementById("rightSlide");

console.log(rightmenu);

function showMenuItems(){
    rightmenu.className="show";
   

}

let closeIcon = rightmenu.children[1].children[0];
console.log(closeIcon);
closeIcon.addEventListener("click",closemenubar);
function closemenubar(){
    rightmenu.className="hide";
}

function moveleft(){
    let left= parseInt(window.getComputedStyle(char).getPropertyValue("left"))
left-=100;
if(left>=0){
    char.style.left = left + "px";


}




}
function moveRight() {
    let left = parseInt(window.getComputedStyle(char).getPropertyValue("left"))
    left += 100;
  if (left <300) {
      char.style.left = left + "px";


  }




}
document.addEventListener("keydown",event=>{
if(event.key==="ArrowLeft"){moveleft();}
else if (event.key === "ArrowRight") {
    moveRight();
}



});
var block=document.getElementById("block");
var counter=0;
block.addEventListener("animationiteration",()=>{
    var random=Math.floor(Math.random()*3);
    let left=random*100;
    block.style.left=left+"px";
    counter++;
});


setInterval(function(){

var charleft=parseInt(window.getComputedStyle(char).getPropertyValue("left"));
var blockleft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
var blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));
if(charleft===blockleft && blockTop<500 && blockTop>300){


alert("Game Over!! Your Score  "+counter);
}

},1);
document.getElementById("left").addEventListener("touchstart",moveleft);
document.getElementById("left").addEventListener("touchstart", moveRight);
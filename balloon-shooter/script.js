var jet = document.getElementById("jet");
var board = document.getElementById("board");
function balloong(){
  games.classList.add('hidden');
  game2.classList.remove('hidden');
window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (e.key == "ArrowLeft" && left > 0) {
    jet.style.left = left - 10 + "px";
  }
  //660 =>  board width - jet width
  else if (e.key == "ArrowRight" && left <= 660) {
    jet.style.left = left + 10 + "px";
  }

  if (e.key == "ArrowUp" || e.keyCode == 32) {
    //32 is for space key
    var bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);

    var movebullet = setInterval(() => {
      var balloons = document.getElementsByClassName("balloons");

      for (var i = 0; i < balloons.length; i++) {
        var balloon = balloons[i];
        if (balloon != undefined) {
          var balloonbound = balloon.getBoundingClientRect();
          var bulletbound = bullet.getBoundingClientRect();

          //Condition to check whether the balloon and the bullet are at the same position..!
          //If so,then we have to destroy that balloon

          if (
            bulletbound.left >= balloonbound.left &&
            bulletbound.right <= balloonbound.right &&
            bulletbound.top <= balloonbound.top &&
            bulletbound.bottom <= balloonbound.bottom
          ) {
            balloon.parentElement.removeChild(balloon); 
            //remove the particular balloon
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
          }
        }
      }
      var bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );

     
      if (bulletbottom >= 500) {
        clearInterval(movebullet);
      }

      bullet.style.left = left + "px"; //bullet should always be placed at the top of the jet.
      bullet.style.bottom = bulletbottom + 3 + "px";
    });
  }
});

var generateballoon= setInterval(() => {
  var balloon = document.createElement("div");
  balloon.classList.add("balloons");
  const arr = ["url('./balloon-shooter/b1.png')", "url('./balloon-shooter/b2.png')", "url('./balloon-shooter/b3.png')"];
  //generate value between 0 to 650 where 650 => board width - rock width
  balloon.style.left = Math.floor(Math.random() * 650) + "px";
  balloon.style.backgroundImage= arr[Math.floor(Math.random() * 3)]

  board.appendChild(balloon);
}, 1000);

var moveballoons = setInterval(() => {
  var balloons = document.getElementsByClassName("balloons");

  if (balloons != undefined) {
    for (var i = 0; i < balloons.length; i++) {
       //Now I have to increase the top of each rock,so that the rocks can move downwards
       console.log("Executed");
      var balloon = balloons[i]; //getting each balloon
      var balloontop = parseInt(
        window.getComputedStyle(balloon).getPropertyValue("top")
      );
      
     //475 => boardheight - balloon height + 25
      if (balloontop >= 450) {
        alert("Game Over");
        clearInterval(moveballoons);
        window.location.reload();
      }

      balloon.style.top = balloontop + 25 + "px";
    }
  }
}, 650);
}
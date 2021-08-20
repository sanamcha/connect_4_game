
let card1 = null;
let card2 = null;
let flips = 0;
let score = 0;
let noClick = false;


const game = document.querySelector("#game");
const h2 = document.getElementById('gameOver');
let currentScore = document.getElementById("current-score");
let lowScore = localStorage.getItem("low-score");


const colors = ["rgb(0,0,0)","rgb(0,255,0)","rgb(0,0,255)","rgb(0,255,255)","rgb(255,0,255)","rgb(0,0,0)","rgb(0,255,0)","rgb(0,0,255)","rgb(0,255,255)","rgb(255,0,255)"];


if (lowScore) {
  document.getElementById("best-score").innerText = lowScore;
}

function divColors(colorArr) {
  for (let color of colorArr) {
    const div = document.createElement("div");
    div.classList.add(color);
    div.addEventListener("click", cardClick);
    game.append(div);
  }
}

    function shuffle(arr) {
    for (let i = arr.length - 1; i>0; i--){
    let j = Math.floor(Math.random() * arr.length);
   
    let temp = arr[i];
     arr[i] = arr[j];
     arr[j] = temp;
  }
  return arr;
}

function cardClick(event) {
  if (noClick) return;
  
  if (event.target.classList.contains("flipping")) return;
  event.target.style.backgroundColor = event.target.classList[0];

  score++;

  currentScore.innerText = score;
  
  if (!card1 || !card2) {
    event.target.classList.add("flipping");
   
    card1 = card1 || event.target;
    card2 = event.target === card1 ? null : event.target;  
  }

  if (card1 && card2) {
    noClick = true;
    
    if(card1.className === card2.className){
      flips += 2;
      
      card1.removeEventListener("click", cardClick);
      card2.removeEventListener("click", cardClick);
      card1 = null;
      card2 = null;
      noClick = false;
    } else {
      setTimeout(function() {
        
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipping");
        card2.classList.remove("flipping");
        card1 = null;
        card2 = null;
        noClick = false;
      }, 1000);
    }
  }
  if(flips === colors.length) endgame();
  
}
function endgame(){

  h2.innerText = "GAME OVER!!!";
 
  let lowScore = +localStorage.getItem("low-score") || Infinity;
    if (score < lowScore) {
     
      localStorage.setItem("low-score", score);
    }  
}

divColors(shuffle(colors));








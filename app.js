/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

remember, with querySelector always use # || . for ids and classes
*/

// declare and set my variables
var scores, roundScore, activePlayer, dice;
scores = [0, 0];
roundScore = 0;
activePlayer = 0;

// select dom objects to edit css
document.querySelector(".dice").style.display = "none";
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

// select the roll button
rollBtn = document.querySelector(".btn-roll");

// add the event listner
rollBtn.addEventListener("click", function() {
  // 1. Generate a random number from 1 - 6
  var dice = Math.floor(Math.random() * 6) + 1;

  // 2. Display the result
  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.setAttribute("src", `dice-${dice}.png`);

  // 3. Update the round score if rolled number !== 1
  if (dice !== 1) {
    // add the score to the current player
    roundScore += dice;
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
  } else {
    // Switch players
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;
    // reset scores
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    // toggle the active player
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    // hide the dice for next player
    document.querySelector(".dice").style.display = "none";
  }
});

document.querySelector('.btn-hold').addEventListener('click', ()=>{
  // add current score to global score
  scores[activePlayer] += roundScore;

  // update the UI
  document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];


  // check if the player won the game
  if(score[activePlayer] === 100){
    console.log(`Player ${activePlayer} has won the game.`)
  }
});
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
init();

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
    nextPlayer();
  }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
  // add current score to global score
  scores[activePlayer] += roundScore;

  // update the UI
  document.getElementById(`score-${activePlayer}`).textContent =
    scores[activePlayer];

  // check if the player won the game
  if (scores[activePlayer] >= 10) {
    console.log(`Player ${activePlayer} has won the game.`);
    document.querySelector(`#name-${activePlayer}`).textContent = "Winner";
    document.querySelector(".dice").style.display = "none";
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add("winner");
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.remove("active");
    document.querySelector(".btn-roll").style.display = "none";
    document.querySelector(".btn-hold").style.display = "none";
  } else {
    nextPlayer();
  }
});

function nextPlayer() {
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

document.querySelector(".btn-new").addEventListener("click", init);

// create a function to initialize a new game
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";

  document.querySelector(".btn-roll").style.display = "block";
  document.querySelector(".btn-hold").style.display = "block";

  // prompt player name
  let player1 = prompt("Player 1 What's your name?");
  let player2 = prompt("Player 2 What's your name?");

  if (player1 && player2 != null) {
    document.querySelector("#name-0").textContent = player1;
    document.querySelector("#name-1").textContent = player2;
  }

  // select dom objects to reset and edit css:
  document.querySelector(".dice").style.display = "none";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  // remove any winner text from last game:
  document.querySelector(`.player-0-panel`).classList.remove("winner");
  document.querySelector(`.player-1-panel`).classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

/*

  finish the intialization function to dry the
  code
  

*/

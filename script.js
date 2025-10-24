const playerOneInput = document.querySelector("#playerOneInput");
const playerTwoInput = document.querySelector("#playerTwoInput");
const cells = document.querySelectorAll(".cell");
const result = document.querySelector("#result");
const resetButton = document.querySelector("#reset");

let playerOne = "";
let playerTwo = "";
let currentPlayer = "";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;
let moveCount = 0;

function updateGameStatus() {
  if (!playerOne || !playerTwo) {
    result.textContent = "Enter both player names to start";
    result.style.color = "#f8f8f2";
    gameActive = false;
  } else if (playerOne === playerTwo) {
    result.textContent = "Players must use different symbols";
    result.style.color = "#ff5555";
    gameActive = false;
  } else {
    if (!currentPlayer) {
      currentPlayer = playerOne;
    }
    result.textContent = `${currentPlayer}'s turn`;
    result.style.color = "#50fa7b";
    gameActive = true;
    highlightCurrentPlayer();
  }
}

function highlightCurrentPlayer() {
  playerOneInput.style.borderColor = currentPlayer === playerOne ? "#50fa7b" : "#39959f";
  playerTwoInput.style.borderColor = currentPlayer === playerTwo ? "#50fa7b" : "#39959f";
}

function handleCellClick(event) {
  if (!gameActive) {
    // Shake the result message if game isn't active
    result.style.animation = "none";
    setTimeout(() => { result.style.animation = "shake 0.3s"; }, 10);
    return;
  }
  
  const cellIndex = parseInt(event.target.id) - 1;

  if (gameBoard[cellIndex] === "") {
    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.style.animation = "pop 0.3s";
    moveCount++;

    const winner = checkWinner();
    if (winner) {
      result.textContent = `🎉 ${winner} wins!`;
      result.style.color = "#f1fa8c";
      gameActive = false;
      playerOneInput.style.borderColor = "#39959f";
      playerTwoInput.style.borderColor = "#39959f";
    } else if (moveCount === 9) {
      result.textContent = "It's a draw!";
      result.style.color = "#bd93f9";
      gameActive = false;
      playerOneInput.style.borderColor = "#39959f";
      playerTwoInput.style.borderColor = "#39959f";
    } else {
      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
      result.textContent = `${currentPlayer}'s turn`;
      highlightCurrentPlayer();
    }
  } else {
    // Shake the cell if already occupied
    event.target.style.animation = "none";
    setTimeout(() => { event.target.style.animation = "shake 0.3s"; }, 10);
  }
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
  ];

  for (const [a, b, c] of winConditions) {
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }
  return null;
}

function resetGame() {
  playerOneInput.value = "";
  playerTwoInput.value = "";
  playerOne = "";
  playerTwo = "";
  currentPlayer = "";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = false;
  moveCount = 0;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.animation = "none";
  });

  playerOneInput.style.borderColor = "#39959f";
  playerTwoInput.style.borderColor = "#39959f";
  result.textContent = "Enter both player names to start";
  result.style.color = "#f8f8f2";
  result.style.animation = "none";
}

playerOneInput.addEventListener("input", () => {
  playerOne = playerOneInput.value.trim();
  updateGameStatus();
});

playerTwoInput.addEventListener("input", () => {
  playerTwo = playerTwoInput.value.trim();
  updateGameStatus();
});

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);

// Initialize
updateGameStatus();

const playerOneInput = document.querySelector("#playerOneInput");
const playerTwoInput = document.querySelector("#playerTwoInput");
const board = document.querySelector("#board");
const cells = document.querySelectorAll(".cell");
const result = document.querySelector("#result");
const resetButton = document.querySelector("#reset");

let playerOne = "";
let playerTwo = "";
let currentPlayer = playerOne;
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

playerOneInput.value = playerOne;
playerTwoInput.value = playerTwo;

function handleCellClick(event) {
  const cellIndex = Array.from(cells).indexOf(event.target);

  if (gameActive && gameBoard[cellIndex] === "") {
    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      result.textContent = `${winner} wins!`;
      gameActive = false;
    } else if (gameBoard.every((cell) => cell !== "")) {
      result.textContent = `It's a draw!`;
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
      result.textContent = `${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return gameBoard[a];
    }
  }
  return null;
}

function resetGame() {
  // Clear the player name input fields
  // playerOneInput.value = "";
  // playerTwoInput.value = "";

  // Reset player name variables to empty strings
  playerOne = "";
  playerTwo = "";

  // Set the current player to an empty string
  currentPlayer = "";

  // Clear the game board
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;

  // Clear the cell contents
  cells.forEach((cell) => {
    cell.textContent = "";
  });

  // Reset the result message
  result.textContent = "";
}

playerOneInput.addEventListener("input", () => {
  playerOne = playerOneInput.value || "";
  currentPlayer = playerOne;
  result.textContent = `${currentPlayer}'s turn`;
});

playerTwoInput.addEventListener("input", () => {
  playerTwo = playerTwoInput.value || "";
  if (currentPlayer === playerTwo) {
    result.textContent = `${currentPlayer}'s turn`;
  }
});

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);

// Set the initial game state
result.textContent = `${currentPlayer}'s turn`;

// wrap factory functions inside IIFE  
const GameBoard = (function () {
    // create board
    const board = [];
    board.length = 0;
    const boardSize = 3;

    function createBoard() {
        for (let i = 0; i < boardSize; i++) {
            board.push([' ', ' ', ' ']);
        }
    }
    // update board with player symbol if empty
    function updateBoard(row, col, player) {
        if (board[row][col] === ' ') {
            board[row][col] = player;
            return true;
        }
        return false;
    }

    function displayBoard() {
        console.log(board.map(row => row.join('|')).join('\n------\n'));
    }
    function checkWin() {
        const players = ["X", "O"];
        for (let player of players) {

            for (let i = 0; i < 3; i++) {
                if (board[i].every(cell => cell === player)) {
                    return player
                }
                if (board.every(row => row[i] === player)) {
                    return player
                }
                // Check diagonals
                if ((board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
                    (board[0][2] === player && board[1][1] === player && board[2][0] === player)) {
                    return player;
                }
            }
        }
        return false;
    }
    function checkDraw() {
        return board.every(row => row.every(cell => cell !== " "))
    }
    return {
        createBoard,
        updateBoard,
        displayBoard,
        checkWin,
        checkDraw
    };
})();

// Factory functions are used to create multiple instances of similar objects
// use arrow function for better readability
const Player = (number, symbol) => {
    const getName = () => number;
    const getSymbol = () => symbol;

    const makeMove = (row, col) => {
        return GameBoard.updateBoard(row, col, symbol);
    }
    // return player object
    return { getName, getSymbol, makeMove };
}



const GameController = (function () {
    let players = [];
    let currentPlayerIndex = 0;

    
    function startGame() {

        players = [Player("Player 1", "X"), Player("Player 2", "O")];
        GameBoard.createBoard();
        playRound();
    }
    function switchTurn() {
        currentPlayerIndex = (currentPlayerIndex + 1) % 2;
    }
    function madeTurn() {
        const currentPlayer = players[currentPlayerIndex];
        let moveCorrect = false;
        while (!moveCorrect) {
            const position = prompt(`${currentPlayer.getName()}: Where do you place your ${currentPlayer.getSymbol()}? Format: row,col`);
            const [row, col] = position.split(',').map(Number);


            if (row >= 0 && row < 3 && col >= 0 && col < 3) {
                moveCorrect = currentPlayer.makeMove(row, col, GameBoard);
                if (!moveCorrect) {
                    console.log("This cell is already occupied, please choose a empty cell.")

                }
            } else {
                console.log("Invalid move. Please enter values between 0 and 2.")
            }
        }
    }
    function checkGameOver() {
        const winner = GameBoard.checkWin();
        if (winner) {
            console.log(`Player ${players.find(player => player.getSymbol() === winner).getName()} wins!`);
            GameBoard.displayBoard();
            return true;
        }
        if (GameBoard.checkDraw()) {
            GameBoard.displayBoard();
            console.log("The game ended in a draw!")
            return true;
        }

        return false;
    }
    function playRound() {
        while (true) {
            GameBoard.displayBoard();
            madeTurn();
            if (checkGameOver()) break;
            switchTurn();
        }
    }

    return {
        startGame
    };
})();




const gameBoard = [
    ["A", "A", "A"],
    ["A", "A", "A"],
    ["A", "A", "A"]
];
let currentPlayer = "X";
const info = document.querySelector(".info");

function renderGame() {
    const game = document.querySelector(".game")
    game.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < 3; j++) {
            let cell = document.createElement("div")
            cell.className = "cell";
            // cell.innerHTML = "X";
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", markCell)
            cell.innerHTML = gameBoard[i][j];
            row.appendChild(cell);
        }
        game.appendChild(row);
    }

};

function markCell(event) {

    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    // check if cell is empty or marked
    if (gameBoard[row][col] !== "A") {
        return;
    }

    gameBoard[row][col] = currentPlayer;
    event.target.innerHTML = currentPlayer;

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    console.log(gameBoard);
    checkWin();
    checkDraw();

};




// Start the game

renderGame();
// GameController.startGame();

/* Write a function that will render the contents of the gameboard array to the webpage
    (for now, you can always just fill the gameboard array with "X"s and "O"s just to see what’s going on).
Write the functions that allow players to add marks to a specific spot on the board by interacting with the appropriate DOM elements
    (e.g.letting players click on a board square to place their marker). */

/* 
Use module patterns and factory functions to avoid global code
GameBoard
  - createBoard()
  - updateBoard(row, col, symbol)
  - displayBoard()
  - checkWin()
  - checkDraw()

Player
  - name
  - symbol
  - makeMove(board)

GameController (IIFE)
  - startGame()
  - switchTurn()
  - handleTurn()
  - checkGameOver() */
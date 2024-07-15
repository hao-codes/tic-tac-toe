// create a working console-based tic-tac-toe game first
// then add HTML, CSS, DOM
/*
Focus on getting a working game in the console first. Make sure you include logic that checks for when the game is over!
You should be checking for all winning 3-in-a-rows and ties.
Try to avoid thinking about the DOM and your HTML/CSS until your game is working.

- Create a game board

- write a function that allows players to take turns
- write a function that switches between players and keeps track of whose turn it is
- write a game check function that checks for a win or a tie
- write a function that resets the game


*/

// create a game board
function gameBoard() {
    const rows = 3;
    const cols = 3;
    const board = [];
    // create a 3x3 board in a 2D array
    for (let i = 0; i < rows; i++) {
        board.push([]);
        for (let j = 0; j < cols; j++) {
            board[i].push('');
        }
    }

    console.log(board);
    return board;
}
let board = gameBoard();
//console.log(board);


const player1 = "X";
const player2 = "O";

function playerTurn(player) {

    let position = prompt("Where do you place your X ? Format: row,col")
    let row = position.split(",")[0]
    let col = position.split(",")[1]
    console.log(row, col);
    
    return [row, col, lastPlayer]
}
let [row, col, player] = playerTurn(lastPlayer);
// update board

function updateBoard(row, col, player, board) {
    console.log(player);
    board[row-1][col-1] = player;
    return board;
}
board = updateBoard(row, col, player, board)

console.log(board);

function getWin(board) {
    // check rows, columns, diagonals for 3
    let play1 = "X";
    let play2 = "O";
    for (let i = 0; i < 3; i++) {
        if (board[i].every(cell => cell === play1)) {
            return play1    
        }
        if (board[i].every(cell => cell === play2)) {
            return play2
        }
    // columns
        
        
    }
}
// create function to check if a player has won
// get board array
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
}
gameBoard();
console.log(gameBoard());
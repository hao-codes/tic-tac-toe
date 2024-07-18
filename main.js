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
function createGameBoard() {
    const boardSize = 3;
    const board = [];
    // create a 3x3 board in a 2D array
    for (let i = 0; i < boardSize; i++) {
        board.push([]);
        for (let j = 0; j < boardSize; j++) {
            board[i].push(' ');
        }
    }
    return board;
}

function playerTurn(player) {
    let position = prompt(`Player ${player}: Where do you place your ${player}? Format: row,col`);
    let [row, col] = position.split(',').map(Number);
    return [row, col, player];
}

function updateBoard(row, col, player, board) {
    console.log(player);
    board[row - 1][col - 1] = player;
    return board;
}

function checkWin(board) {
    // check rows, columns, diagonals for 3
    let play1 = "X";
    let play2 = "O";
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

function checkDraw(board) {
    return board.every(row => row.every(cell => cell !== " "))
}

function playGame() {
    console.log("Let's play Tic Tac Toe");
    let board = createGameBoard();
    const player1 = "X";
    const player2 = "O";

    let currentPlayer = player1;
    while (true) {
        console.log(`Current board:`);
        console.log(board.map(row => row.join('|')).join('\n------\n'));
        let [row, col] = playerTurn(currentPlayer);
        if ((row < 1 || row > 3) || (col < 1 || col > 3)) {
            console.log("Invalid field, please enter a valid field")
            continue;
        } else if (board[row - 1][col - 1] !== ' ') {
            console.log("This cell is already occupied. Please choose another one.");
            continue;
        }

        board = updateBoard(row, col, currentPlayer, board)

        console.log("last player: " + currentPlayer);
        if (checkDraw(board)) {
            console.log("The Game ended in a Draw!");
            console.log(board.map(row => row.join('|')).join('\n------\n'));
            break;
        };
        const winner = checkWin(board);
        if (winner) {
            console.log(`Player ${winner} has won, congrats`);
            console.log(board.map(row => row.join('|')).join('\n------\n'));
            break;
        };
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
}
playGame();

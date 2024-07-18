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
    for (let i = 0; i < 3; i++) {
        if (board[i].every(cell => cell === play1)) {
            return play1
        }
        if (board.every(row => row[i] === play1)) {
            return play1
        }

        if (board[i].every(cell => cell === play2)) {
            return play2
        }
        if (board.every(row => row[i] === play2)) {
            return play2
        }
        // columns
    }
    // Check diagonals
    if ((board[0][0] === play1 && board[1][1] === play1 && board[2][2] === play1) ||
        (board[0][2] === play1 && board[1][1] === play1 && board[2][0] === play1)) {
        return play1;
    }

    if ((board[0][0] === play2 && board[1][1] === play2 && board[2][2] === play2) ||
        (board[0][2] === play2 && board[1][1] === play2 && board[2][0] === play2)) {
        return play2;
    }

    return false;
}

function checkDraw(board) {
    return board.every(row => row.every(cell => cell !== ""))
}

function playGame() {
    console.log("Let's play Tic Tac Toe");
    let board = createGameBoard();
    const player1 = "X";
    const player2 = "O";
    let placedCrosses = [];
    /*     if (typeof nextPlayer === "undefined") {
            let nextPlayer = player1;
        } */
    let currentPlayer = player1;
    let drawResult = checkDraw(board);
    let winResult = checkWin(board);

    while (true) {
        console.log(`Current board:`);
        console.log(board.map(row => row.join('|')).join('\n---------\n'));
        let [row, col] = playerTurn(currentPlayer);
        if (board[row - 1][col - 1] !== '') {
            console.log("This cell is already occupied. Please choose another one.");
            continue;
        }

        board = updateBoard(row, col, currentPlayer, board)
        /*         if (lastPlayer == player1) {
                    nextPlayer = player2
                } else {
                    nextPlayer = player1
                }; */
        console.log("last palyer: " + currentPlayer);
        /*         drawResult = 
                winResult =  */
        console.log(board);
        if (checkDraw(board)) {
            console.log("The Game ended in a Draw!");
            break;
        };
        if (checkWin(board)) {
            console.log("Player " + winResult + " has won, congrats");
            break;
        };
        currentPlayer = currentPlayer === player1 ? player2 : player1;

    };

}
playGame();
// p1 starts - update board - save last player - check for win/draw
// win or draw: stop
// look for result
// if draw: print: draw
// if win: print winner
// later: ask to play again: start game again
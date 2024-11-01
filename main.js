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


// Start the game
GameController.startGame();

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
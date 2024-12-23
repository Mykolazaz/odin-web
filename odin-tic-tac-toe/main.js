// Game board state
const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board;
    
    const markSquare = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    };

    const checkWinner = () => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return board.includes('') ? null : 'Tie';
    };

    return { getBoard, markSquare, resetBoard, checkWinner };
})();

// Player objects
const Player = (name, marker) => {
    return { name, marker };
};

// Game interface, main control
const GameController = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    const initializePlayers = (player1Name, player2Name) => {
        players = [
            Player(player1Name, 'X'),
            Player(player2Name, 'O')
        ];
        currentPlayerIndex = 0;
        gameOver = false;
    };

    const getCurrentPlayer = () => players[currentPlayerIndex];

    const switchPlayer = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };

    const playRound = (index) => {
        if (gameOver) return null;

        const currentPlayer = getCurrentPlayer();
        
        if (Gameboard.markSquare(index, currentPlayer.marker)) {
            const result = Gameboard.checkWinner();
            
            if (result) {
                gameOver = true;
                return result === 'Tie' ? 'Tie' : currentPlayer;
            }

            switchPlayer();
            return null;
        }

        return null;
    };

    const isGameOver = () => gameOver;

    const resetGame = () => {
        Gameboard.resetBoard();
        currentPlayerIndex = 0;
        gameOver = false;
    };

    return { 
        initializePlayers, 
        playRound, 
        getCurrentPlayer,
        isGameOver,
        resetGame
    };
})();

const DisplayController = (() => {
    const boardElement = document.getElementById('gameboard');
    const statusElement = document.getElementById('game-status');
    const startButton = document.getElementById('start-game');
    const restartButton = document.getElementById('restart-game');
    const player1Input = document.getElementById('player1-name');
    const player2Input = document.getElementById('player2-name');

    const renderBoard = () => {
        boardElement.innerHTML = '';
        const board = Gameboard.getBoard();
        board.forEach((mark, index) => {
            const square = document.createElement('div');
            square.classList.add('square');
            square.textContent = mark;
            square.dataset.index = index;
            square.addEventListener('click', handleSquareClick);
            boardElement.appendChild(square);
        });
    };

    const handleSquareClick = (e) => {
        const index = e.target.dataset.index;
        const result = GameController.playRound(index);
        renderBoard();
        updateStatus(result);
    };

    const updateStatus = (result) => {
        if (result === null) {
            statusElement.textContent = `${GameController.getCurrentPlayer().name}'s turn`;
        } else if (result === 'Tie') {
            statusElement.textContent = "It's a Tie!";
            endGame();
        } else {
            statusElement.textContent = `${result.name} wins!`;
            endGame();
        }
    };

    const endGame = () => {
        restartButton.style.display = 'block';
    };

    const setupGameStart = () => {
        const player1Name = player1Input.value || 'Player 1';
        const player2Name = player2Input.value || 'Player 2';
        
        GameController.initializePlayers(player1Name, player2Name);
        document.getElementById('player-setup').style.display = 'none';
        boardElement.style.display = 'grid';
        restartButton.style.display = 'none';
        
        renderBoard();
        statusElement.textContent = `${GameController.getCurrentPlayer().name}'s turn`;
    };

    const setupRestartGame = () => {
        GameController.resetGame();
        document.getElementById('player-setup').style.display = 'block';
        boardElement.style.display = 'none';
        restartButton.style.display = 'none';
        statusElement.textContent = '';
    };

    startButton.addEventListener('click', setupGameStart);
    restartButton.addEventListener('click', setupRestartGame);

    return { renderBoard };
})();
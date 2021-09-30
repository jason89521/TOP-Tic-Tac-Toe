import { Player, PlayerSetting } from "./player.js";

const Board = (() => {
    const squares = document.querySelectorAll(".square");
    const squaresArray = [];
    squares.forEach((value) => {
        squaresArray.push(value);
    });

    const initialize = () => {
        squares.forEach((value) => {
            value.textContent = "";
        });
    };

    /**
     * @param {number} index 
     * @returns 
     */
    const isValidIndex = (index) => {
        if (index < 0 || index >= squaresArray.length) {
            console.error("Index out of range");
            return false;
        }
        return squaresArray[index].textContent === "";
    };

    return {
        squaresArray,
        initialize,
        isValidIndex,
    };
})();

/**
 * The life cycle of a turn
 * 1. call _determineAction()
 * 2. wait the player mark
 * 3. check whether the game is over
 * 4. if it is not over, change the turn and back to step 2
 */
const Game = (() => {
    const _modal = document.getElementById("modal");
    const _boardContainer = document.getElementById("board-container");
    const _resultMsg = document.getElementById("resultMsg");
    // Hide the modal when user click it.
    _modal.addEventListener("click", (event) => {
        _modal.style.display = "none";
    });
    // Handle users click on the squares.
    _boardContainer.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        if (index) {
            _markByHuman(parseInt(index));
        }
    });

    const _player1 = Player();
    const _player2 = Player();
    let _currentPlayer = _player1;
    let _timeoutID;

    /**
     * This method call AI to mark a square.
     */
    const _determineAction = () => {
        if (_currentPlayer.getType() === "AI") {
            // Delay a while such that it will not display result immediately when 2 players are AI.
            _timeoutID = setTimeout(_markByAI, 500);
        }
    };
    const _markByAI = () => {
        const mode = _currentPlayer.getMode();
        if (mode === "Easy") {
            _currentPlayer.markByEasyAI(Board.squaresArray);
        } else if(mode === "Normal") {
            _currentPlayer.markByNormaAI(Board.squaresArray);
        } else if(mode === "Unbeatable") {
            _currentPlayer.markByUnbeatableAI(Board.squaresArray);
        }
        const result = _isGameOver();
        if (result) _showResult(result);
        else _changeTurn();
    };
    const _markByHuman = (index) => {
        if (!Board.isValidIndex(index) || _currentPlayer.getType() !== "Human") {
            return;
        }
        if (_isGameOver()) {
            return;
        }
        Board.squaresArray[index].textContent = _currentPlayer.getCharacter();
        const result = _isGameOver();
        if (result) _showResult(result);
        else _changeTurn();
    };
    const _isGameOver = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        const squares = Board.squaresArray;
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            // There is a winner.
            if (squares[a].textContent !== ""
            && squares[a].textContent === squares[b].textContent
            && squares[a].textContent === squares[c].textContent) {
                return squares[a].textContent;
            }
        }
        
        const isNotEmpty = (value) => value.textContent !== "";
        if (squares.every(isNotEmpty)) {
            return "tie";
        } else {
            return null;
        }
    };
    const _changeTurn = () => {
        _currentPlayer = _currentPlayer === _player1 ? _player2 : _player1;
        _determineAction();
    };
    const _showResult = (result) => {
        _modal.style.display = "";
        if(result === "tie") {
            _resultMsg.textContent = "It is a tie.";
        }else {
            _resultMsg.textContent = `The winner is ${result}.`;
        }
    };
    
    const startGame = (setting1, setting2) => {
        _modal.style.display = "none";
        _player1.initialize(setting1);
        _player2.initialize(setting2);
        _currentPlayer = (_player1.getCharacter() === "X") ? _player1 : _player2;
        clearTimeout(_timeoutID);
        Board.initialize();
    
        _determineAction();
    };
    return {
        startGame,
    };
})();

Game.startGame(PlayerSetting("X", "Human", "Easy"), PlayerSetting("O", "Human", "Easy"));

export { Game };
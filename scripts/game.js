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

const Game = (() => {
    const _modal = document.getElementById("modal");
    _modal.addEventListener("click", (event) => {
        _modal.style.display = "none";
    });
    const _resultMsg = document.getElementById("resultMsg");
    const _boardContainer = document.getElementById("board-container");
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

    const _determineAction = () => {
        if (_currentPlayer.getType() === "AI") {
            _timeoutID = setTimeout(_markByAI, 500);
        }
    };
    const _markByAI = () => {
        if (_currentPlayer.getMode() === "Easy") {
            _currentPlayer.markByEasyAI(Board.squaresArray);
            const result = _isGameOver();
            if (result) _showResult(result);
            else _changeTurn();
        }
    };
    const _markByHuman = (index) => {
        if (!Board.isValidIndex(index) || _currentPlayer.getType() !== "human") {
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
        if (_currentPlayer.getType() === "AI") {
            _determineAction();
        } else {
            _determineAction();
        }
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

Game.startGame(PlayerSetting("X", "human", "Easy"), PlayerSetting("O", "human", "Easy"));

export { Game };
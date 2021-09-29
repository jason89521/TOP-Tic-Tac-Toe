const Player = () => {
    let _char = ""
    let _type = "";
    let _mode = "";

    const initPlayer = (setting) => {
        _char = setting.char;
        _type = setting.type;
        _mode = setting.mode;
    };
    const getType = () => { return _type };
    const getMode = () => { return _mode };
    const getChar = () => { return _char };

    const _esayAI = () => {
        const squares = Board.getSquares();
        const options = [];
        squares.forEach((value, index) => {
            if(value === "")
                options.push(index);
        });
        return options[0];
    }

    /**
     * Determine which square to mark by AI.
     */
    const determineByAI = () => { 
        if(_mode == "easy") return _esayAI();
    };

    return {
        initPlayer,
        getType,
        getMode,
        getChar,
        determineByAI,
    };
};

const Board = (() => {
    const _squares = ["", "", "", "", "", "", "", "", ""];

    const initBoard = () => {
        const len = _squares.length;
        for (let i = 0; i < len; i++)
            _squares[i] = "";
    };

    const isValidIndex = (index) => {
        if (index < 0 || index >= _squares.length) {
            console.error("Index out of range.");
            return false;
        }

        return _squares[index] === "";
    };

    const getSquares = () => { return _squares.slice(0); };

    /**
     * Set `_squares[index]` = `char`.
     * @param {number} index 
     * @param {string} char 
     * @returns {boolean} Success or not.
     */
    const setSquares = (index, char) => {
        if (isValidIndex(index)) {
            _squares[index] = char;
            return true;
        }

        return false
    }

    return {
        initBoard,
        isValidIndex,
        getSquares,
        setSquares,
    };
})();

/**
 * 1. Call `initGame()` to initialize the game.
 * 2. Call `startTurn()`.
 *     * If current player is human, do nothing, and return false 
 *       which means that there is no need to render board immediately.
 *     * Else, this module will let the AI determine which square to be marked.
 *       Finally, it will return true to tell the board should be render immediately.
 *       Then go to step 4.
 * 3. After the turn is finished(human marked), 
 *    call `getBoard()` to get the latest board so as to render the board.
 * 4. Call `isGameOver()` to check whether game is over.
 *    If it is not over, back to step 2.
 */
const Game = (() => {
    const _player1 = Player();
    const _player2 = Player();
    let _currentPlayer = _player1;
    let _turn = "X";

    /**
     * Initialize two players' state, whose turn and the game board.
     * @param {Object} player1Setting
     * @param {Object} player2Setting
     */
    const initGame = (player1Setting, player2Setting) => {
        Board.initBoard();
        _turn = "X";
        _player1.initPlayer(player1Setting);
        _player2.initPlayer(player2Setting);
        if (_player1.getChar() === "X")
            _currentPlayer = _player1;
        else
            _currentPlayer = _player2;
    };

    /**
     * If the current player is AI, calling the method will let AI determine
     * which square it want to mark.
     */
    const startTurn = () => {
        if (_currentPlayer.getType() === "AI") {
            mark(_currentPlayer.determineByAI(), "AI")
        }
    };

    /**
     * Current player mark a square at `index`.
     * If success, change current player.
     * 
     * @param {number} index
     * @param {string} type
     * @returns {boolean} success or not.
     */
    const mark = (index, type) => {
        if (_currentPlayer.getType() !== type || isGameover()) {
            return false;
        } else {
            if (Board.setSquares(index, _currentPlayer.getChar())) {
                _currentPlayer = _currentPlayer === _player1 ? _player2 : _player1;
                startTurn();
                return true;
            }
            else
                return false;
        }
    };

    /**
     * Get the game board.
     */
    const getBoard = () => { return Board.getSquares(); };

    /**
     * Check whether game is over.
     * @returns {string} The result if game is over. Null if game is not over.
     */
    const isGameover = () => {
        const squares = Board.getSquares();
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] !== "" && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        const remainingSquares = squares.filter(value => value === "");
        if(remainingSquares.length === 0){
            return "tie";
        }

        return null;
    };

    return {
        initGame,
        startTurn,
        getBoard,
        mark,
        isGameover,
    };
})();

export { Game };
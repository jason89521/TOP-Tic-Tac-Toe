const PlayerSetting = (character, type, mode) => {
    return{
        character,
        type,
        mode,
    };
}

const Player = () => {
    let _character = "";
    let _type = "";
    let _mode = "";

    /**
     * @param {Array<HTMLElement>} squares 
     * @returns {Array<HTMLElement>} The squares that are empty.
     */
    const _getEmptySquares = (squares) => {
        const remainingSquares = [];
        squares.forEach((value) => {
            if (value.textContent === "") {
                remainingSquares.push(value);
            }
        });
        return remainingSquares;
    }

    /**
     * @param {Array<string>} gameBoard 
     * @returns {string} The result of the game.
     */
    const _isGameOver = (gameBoard) => {
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
        for(let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            // A player wins.
            if(gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }
        const isNotEmpty = value => value !== "";
        if(gameBoard.every(isNotEmpty)) {
            return "tie";
        }
        return null;
    }

    /**
     * @param {Array<string>} gameBoard 
     * @param {string} currentTurn 
     * @param {number} depth 
     * @returns index is where the ai want to mark.
     */
    const _miniMax = (gameBoard, currentTurn, depth) => {
        let index = -1;
        let value = 0;
        const gameResult = _isGameOver(gameBoard);
        if(gameResult) {
            if(gameResult === "tie") {
                // Do nothing.
            } else if(gameResult === _character) {
                // If the result of the game is current player win, return a positve number.
                // The bigger the depth is means the later current player win.
                value = 10 - depth;
            } else {
                // If the result of the game is current player win, return a negative number.
                // The bigger the depth is means the later current player lose.
                value = depth - 10;
            }
            return { index, value};
        }
        
        const nextTurn = (currentTurn === "X") ? "O" : "X";
        // If now is current player's turn, then it will want the biggest value,
        // such that it will win as soon as possible.
        // Else, it will want the smallest value to mimic its adversary.
        if(currentTurn === _character) {
            value = -Infinity;
            for(let i = 0; i < gameBoard.length; i++) {
                if(gameBoard[i] === "") {
                    gameBoard[i] = currentTurn;
                    const temp = _miniMax(gameBoard, nextTurn, depth+1);
                    if(temp.value > value) {
                        value = temp.value;
                        index = i;
                    }
                    gameBoard[i] = "";
                }
            }
        } else {
            value = Infinity;
            for(let i = 0; i < gameBoard.length; i++) {
                if(gameBoard[i] === "") {
                    gameBoard[i] = currentTurn;
                    const temp = _miniMax(gameBoard, nextTurn, depth+1);
                    if(temp.value < value) {
                        value = temp.value;
                        index = i;
                    }
                    gameBoard[i] = "";
                }
            }
        }

        return {index, value};
    };

    const initialize = (setting) => {
        _character = setting.character;
        _type = setting.type;
        _mode = setting.mode;
    };

    const getCharacter = () => _character;
    const getType = () => _type;
    const getMode = () => _mode;

    /**
     * @param {Array<HTMLElement>} squares 
     */
    const markByEasyAI = (squares) => {
        const remainingSquares = _getEmptySquares(squares);
        remainingSquares[0].textContent = _character;
    }

    /**
     * @param {Array<HTMLElement>} squares 
     */
    const markByNormaAI = (squares) => {
        const remainingSquares = _getEmptySquares(squares);
        const index = Math.floor(Math.random() * remainingSquares.length);
        remainingSquares[index].textContent = _character;
    }

    /**
     * @param {Array<HTMLElement>} squares 
     */
    const markByUnbeatableAI = (squares) => {
        // Turn HTMLElement array to string array.
        const gameBoard = [];
        squares.forEach((value) => {
            gameBoard.push(value.textContent);
        })

        const index = _miniMax(gameBoard, _character, 0).index;
        if(index !== -1) {
            squares[index].textContent = _character;
        }else{
            console.error("Index out of range.");
        }
    }

    return {
        initialize,
        getCharacter,
        getType,
        getMode,
        markByEasyAI,
        markByNormaAI,
        markByUnbeatableAI,
    };
};

export {Player, PlayerSetting};
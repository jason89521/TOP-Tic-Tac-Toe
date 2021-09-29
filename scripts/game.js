const Player = () => {
    let _character = "";
    let _type = "";
    let _mode = "";

    const initialize = (setting) => {
        _character = setting.character;
        _type = setting.type;
        _mode = setting.mode;
    };

    const getCharacter = () => _character;
    const getType = () => _type;
    const getMode = () => _mode;

    const markByEasyAI = (character) => {
        const remainingSquare = [];
        Board.squaresArray.forEach((value) => {
            if (value.textContent === "") {
                remainingSquare.push(value);
            }
        });
        remainingSquare[0].textContent = character;
    }

    return {
        initialize,
        getCharacter,
        getType,
        getMode,
        markByEasyAI,
    };
};

const Board = (() => {
    const squares = document.querySelectorAll(".square");
    const squaresArray = [];
    squares.forEach((value) => {
        squaresArray.push(value);
    })

    const initialize = () => {
        squares.forEach((value) => {
            value.textContent = "";
        });
    }

    return {
        squaresArray,
        initialize,
    };
})();

const Game = (() => {
    const player1 = Player();
    const player2 = Player();
    let currentPlayer = player1;

    const initialize = (setting1, setting2) => {
        player1.initialize(setting1);
        player2.initialize(setting2);
        currentPlayer = (player1.getCharacter() === "X") ? player1 : player2;
        Board.initialize();

        determineAction();
    };
    const determineAction = () => {
        if (currentPlayer.getType() === "AI") {
            markByAI();
        }
    };
    const markByAI = () => {
        if (currentPlayer.getMode() === "easy") {
            currentPlayer.markByEasyAI(currentPlayer.getCharacter());
            checkGameOver();
        }
    };
    const markByHuman = () => { };
    const checkGameOver = () => {
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
            const [a,b,c] = lines[i];
            if (squares[a].textContent !== ""
                && squares[a].textContent === squares[b].textContent
                && squares[a].textContent === squares[c].textContent) {
                showResult(squares[a].textContent);
                return;
            }
        }

        const isNotEmpty = (value) => value.textContent !== "";
        if(squares.every(isNotEmpty)) {
            showResult("tie");
            return;
        }else {
            changeTurn();
        }
    };
    const changeTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        if(currentPlayer.getType() === "AI"){
            setTimeout(determineAction, 500);
        } else {
            determineAction();
        }
    };
    const showResult = (result) => {
        console.log(result);
    };

    return {
        initialize,
    };
})();

Game.initialize({ character: "X", type: "AI", mode: "easy" },
    { character: "O", type: "AI", mode: "easy" });
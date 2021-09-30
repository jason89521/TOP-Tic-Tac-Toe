import { Player, PlayerSetting} from "./player.js";

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
        if(index < 0 || index >= squaresArray.length) {
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
            currentPlayer.markByEasyAI(Board.squaresArray);
            const result = isGameOver();
            if(result) showResult(result);
            else changeTurn();
        }
    };
    const markByHuman = (index) => {
        if(!Board.isValidIndex(index) || currentPlayer.getType() !== "human"){
            return;
        }
        if(isGameOver()){
            return;
        }
        Board.squaresArray[index].textContent = currentPlayer.getCharacter();
        const result = isGameOver();
        if(result) showResult(result);
        else changeTurn();
    };
    const isGameOver = () => {
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
                return squares[a].textContent;
            }
        }

        const isNotEmpty = (value) => value.textContent !== "";
        if(squares.every(isNotEmpty)) {
            return "tie";
        }else {
            return null;
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
        markByHuman,
    };
})();

Game.initialize(PlayerSetting("X", "AI", "easy"),
    PlayerSetting("O", "AI", "easy"));

const boardContainer = document.getElementById("board-container");

boardContainer.addEventListener("click", (event) => {
    const index = event.target.dataset.index;
    if(index) {
        Game.markByHuman(parseInt(index));
    }
});

export {Game};
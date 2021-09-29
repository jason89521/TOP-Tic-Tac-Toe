import { Game } from "./game.js";

const boardContainer = document.getElementById("board-container");
const squares = document.querySelectorAll(".square");

boardContainer.addEventListener("click", (event) => {
    const index = event.target.dataset.index;
    if(index){
        // if mark is successful, render the board.
        if(Game.mark(parseInt(index, 10), "human")){
            renderBoard();
            let result = Game.isGameover();
            if(!result) {
                Game.startTurn();
                renderBoard();
            }
        }
    }
});

const controlContainer = document.getElementById("control-container");

controlContainer.addEventListener("click", (event) => {
    const control = event.target.dataset.control;
    if(control === "start") {
        Game.initGame(player1Setting, player2Setting);
        renderBoard();
        Game.startTurn();
        renderBoard();
    }
});



let player1Setting = {char: "X", type: "AI", mode:"easy"};
let player2Setting = {char: "O", type: "AI", mode:"easy"};
Game.initGame(player1Setting, player2Setting);
Game.startTurn();
renderBoard();

function renderBoard() {
    const board = Game.getBoard();
    squares.forEach((square, index) => {
        square.textContent = board[index];
    });
};
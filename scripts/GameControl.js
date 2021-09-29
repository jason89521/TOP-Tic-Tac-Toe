const Player = () => {
    let _type = "";
    let _mode = "";

    const initPlayer = () => {};
    const getType = () => {};

    /**
     * Determine which square to mark by AI.
     * If the _type is not AI, then return -1;
     */
    const determineByAI = () => {};
};

const Board = (() => {
    const _squares = ["", "", "", "", "", "", "", "", ""];

    const initBoard = () => {};
    const getSquares = () => {};

    return {
        initBoard,
    };
})();

const Game = (() => {
    const _player1;
    const _player2;
    let _currentPlayer;
    let _turn = "X";

    /**
     * Initialize two players' state, whose turn and the game board.
     */
    const initGame = () => {};

    /**
     * Get the game board.
     */
    const getBoard = () => {};

    /**
     * Mark a square in the game board.
     * 1. Check whether the type(parameter) is equal to _currentPlayer's type. 
     *    If it is, move on next step.
     * 2. Mark the square, and check whether the game is over.
     *    If the game is over, return. If not, move on next step.
     * 3. If the next player is AI, then call this again with AI's input.
     */
    const mark = () => {};

    /**
     * Check whether game is over.
     */
    const isGameover = () => {};

    return {
        initGame,
    };
})();

export {Game};
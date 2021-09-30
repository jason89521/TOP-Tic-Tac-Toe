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

    const _getEmptySquares = (squares) =>{
        const remainingSquares = [];
        squares.forEach((value) => {
            if (value.textContent === "") {
                remainingSquares.push(value);
            }
        });
        return remainingSquares;
    }

    const initialize = (setting) => {
        _character = setting.character;
        _type = setting.type;
        _mode = setting.mode;
    };

    const getCharacter = () => _character;
    const getType = () => _type;
    const getMode = () => _mode;

    const markByEasyAI = (squares) => {
        const remainingSquares = _getEmptySquares(squares);
        remainingSquares[0].textContent = _character;
    }

    const markByNormaAI = (squares) => {
        const remainingSquares = _getEmptySquares(squares);
        const index = Math.floor(Math.random() * remainingSquares.length);
        remainingSquares[index].textContent = _character;
    }

    const markByUnbeatable = (squares) => {

    }

    return {
        initialize,
        getCharacter,
        getType,
        getMode,
        markByEasyAI,
        markByNormaAI,
        markByUnbeatable,
    };
};

export {Player, PlayerSetting};
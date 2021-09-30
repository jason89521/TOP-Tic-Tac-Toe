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

    const initialize = (setting) => {
        _character = setting.character;
        _type = setting.type;
        _mode = setting.mode;
    };

    const getCharacter = () => _character;
    const getType = () => _type;
    const getMode = () => _mode;

    const markByEasyAI = (squares) => {
        const remainingSquares = [];
        squares.forEach((value) => {
            if (value.textContent === "") {
                remainingSquares.push(value);
            }
        });
        remainingSquares[0].textContent = _character;
    }

    return {
        initialize,
        getCharacter,
        getType,
        getMode,
        markByEasyAI,
    };
};

export {Player, PlayerSetting};
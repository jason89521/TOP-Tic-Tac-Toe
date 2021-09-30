import { Game } from "./game.js";
import { PlayerSetting } from "./player.js";

const player1Form = document.getElementById("player1-setting");
const player2Form = document.getElementById("player2-setting");
const initBtn = document.getElementById("init");

initBtn.addEventListener("click", (event) => {
    const elements1 = player1Form.elements;
    const elements2 = player2Form.elements;
    const setting1 = PlayerSetting("X", elements1["type"].value, elements1["mode"].value);
    const setting2 = PlayerSetting("O", elements2["type"].value, elements2["mode"].value);
    Game.initialize(setting1, setting2);
});

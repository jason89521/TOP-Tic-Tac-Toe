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
    Game.startGame(setting1, setting2);
});

const player1Type = document.getElementById("player1-type");
const player2Type = document.getElementById("player2-type");
player1Type.addEventListener("click", clickDropdown.bind(player1Type, player1Form));
player2Type.addEventListener("click", clickDropdown.bind(player2Type, player2Form));

const player1Mode = document.getElementById("player1-mode");
const player2Mode = document.getElementById("player2-mode");
player1Mode.classList.add("disabled");
player2Mode.classList.add("disabled");
player1Mode.addEventListener("click", clickDropdown.bind(player1Mode, player1Form));
player2Mode.addEventListener("click", clickDropdown.bind(player2Mode, player2Form));

// When user click anywhere of the window, hide the dropdown content.
window.addEventListener("click", hideDropdown);

/**
 * @param {event} event 
 */
function clickDropdown(formElement, event) {
    event.stopPropagation();
    if(this.classList.contains("disabled"))
        return;

    // If there is another dropdown is already opened, close it.
    if (document.querySelector(".show-content") !== this) {
        hideDropdown();
    }

    const display = this.querySelector("p");
    const elements = formElement.elements;
    const type = event.target.dataset.type;
    const mode = event.target.dataset.mode;
    // Following means that the user is click on the dropdown button, not content.
    if (!type && !mode) this.classList.toggle("show-content");

    if (type) {
        changeSetting(display, type, elements["type"], type);
        hideDropdown();

        if(type === "Human") {
            disableMode(this);
        }else{
            activateMode(this);
        }
    }

    if (mode) {
        changeSetting(display, mode, elements["mode"], mode);

        hideDropdown();
    }
};

function changeSetting(display, content, input, value) {
    display.textContent = content;
    input.value = value;
}

function hideDropdown() {
    const toBeHide = document.querySelector(".show-content");
    if (toBeHide) {
        toBeHide.classList.remove("show-content");
    }
}
<<<<<<< HEAD
=======

function disableMode (playerType) {
    if(playerType === player1Type) {
        player1Mode.classList.add("disabled");
    }else{
        player2Mode.classList.add("disabled");
    }
}

function activateMode(playerType) {
    if(playerType === player1Type) {
        player1Mode.classList.remove("disabled");
    } else{
        player2Mode.classList.remove("disabled");
    }
}
>>>>>>> optimize

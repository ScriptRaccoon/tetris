import { addInfo } from "./info.js";
import { addControls } from "./controls.js";
import { initGame } from "./game.js";

$(() => {
    addInfo();
    addControls();
    initGame();
});

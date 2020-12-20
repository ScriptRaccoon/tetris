import { addNextPiece } from "./piece.js";
import { addInfo } from "./info.js";
import { addControls } from "./controls.js";

// const gameMap = new Array(height).fill(0).map((row) => new Array(width).fill(0));

$(() => {
    addNextPiece();
    addControls();
    addInfo();
});

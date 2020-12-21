import { width, height } from "./dimensions.js";
import { addNextPiece, PIECE } from "./piece.js";
import { movecurrentPiece } from "./controls.js";

const gameSpeed = 300;

export let gameInterval = null;

export const GAME = {
    allowedCoordinates: [],
};

export function initGame() {
    $(".piece").remove();
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    GAME.allowedCoordinates = [];
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            GAME.allowedCoordinates.push([x, y]);
        }
    }
    PIECE.current = null;
    PIECE.next = null;
    addNextPiece();
    gameInterval = setInterval(() => {
        movecurrentPiece("ArrowDown");
    }, gameSpeed);
}

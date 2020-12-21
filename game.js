import { width, height } from "./dimensions.js";
import { addNextPiece, PIECE } from "./piece.js";

export const GAME = {
    allowedCoordinates: [],
};

export function initGame() {
    $(".piece").remove();
    GAME.allowedCoordinates = [];
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            GAME.allowedCoordinates.push([x, y]);
        }
    }
    PIECE.current = null;
    PIECE.next = null;
    addNextPiece();
    console.log(GAME.allowedCoordinates);
}

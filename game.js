import { width, height } from "./dimensions.js";
import { addNextPiece, PIECE, getPieceAt } from "./piece.js";
import { movecurrentPiece } from "./controls.js";
import { removeAll, interval, appears } from "./utils.js";

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
        for (let y = -3; y < height; y++) {
            GAME.allowedCoordinates.push([x, y]);
        }
    }
    PIECE.current = null;
    PIECE.next = null;
    addNextPiece();
    // gameInterval = setInterval(() => {
    //     movecurrentPiece("ArrowDown");
    // }, gameSpeed);
}

export function freezePiece() {
    removeAll(PIECE.current.coordinates, GAME.allowedCoordinates);
}

export function checkTetris(yValues) {
    const yValues = Array.from(
        new Set(PIECE.current.coordinates.map((coord) => coord[1]))
    ).sort((a, b) => b - a);
    const fullyLines = yValues.filter((y) =>
        interval(0, width).every((x) => !appears([x, y], GAME.allowedCoordinates))
    );
    if (fullyLines.length === 0) return;
    // remove lines
    for (const y of fullyLines) {
        for (const x of interval(0, width)) {
            GAME.allowedCoordinates.push([x, y]);
            const piece = getPieceAt(x, y);
            piece.remove();
        }
        // todo: move lines above down
    }
}

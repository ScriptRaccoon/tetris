import { PIECE, addNextPiece, drawPiece } from "./piece.js";
import { initGame, GAME, freezePiece, checkTetris } from "./game.js";
import { isSubset, rotate } from "./utils.js";

const moveSpeed = 100;
const fallSpeed = moveSpeed / 7;

export function addControls() {
    $(window).on("keydown", (e) => {
        movecurrentPiece(e.key);
    });
}

function enableMove() {
    PIECE.current.canMove = true;
}

function disableMove() {
    PIECE.current.canMove = false;
}

const MOVE_MAP = {
    ArrowLeft: ([x, y]) => [x - 1, y],
    ArrowRight: ([x, y]) => [x + 1, y],
    ArrowDown: ([x, y]) => [x, y + 1],
    ArrowUp: (coord) => rotate(coord, PIECE.current.rotationCenter),
};

export function movecurrentPiece(key) {
    if (!PIECE.current || !PIECE.current.canMove) return;
    if (Object.keys(MOVE_MAP).includes(key)) {
        const currentMap = MOVE_MAP[key];
        const movedCoordinates = PIECE.current.coordinates.map(currentMap);
        if (isSubset(movedCoordinates, GAME.allowedCoordinates)) {
            disableMove();
            PIECE.current.coordinates = movedCoordinates;
            PIECE.current.rotationCenter = currentMap(PIECE.current.rotationCenter);
            drawPiece(moveSpeed);
            setTimeout(enableMove, moveSpeed);
        } else if (key === "ArrowDown") {
            freezePiece();
            checkTetris();
            addNextPiece();
        }
    } else if (key === " ") {
        const currentMap = MOVE_MAP["ArrowDown"];
        disableMove();
        let fallHeight = 0;
        let movedCoordinates = PIECE.current.coordinates.map(currentMap);
        while (isSubset(movedCoordinates, GAME.allowedCoordinates)) {
            fallHeight++;
            PIECE.current.coordinates = movedCoordinates;
            PIECE.current.rotationCenter = currentMap(PIECE.current.rotationCenter);
            movedCoordinates = PIECE.current.coordinates.map(currentMap);
        }
        drawPiece(fallHeight * fallSpeed);
        setTimeout(() => {
            freezePiece();
            checkTetris();
            addNextPiece();
        }, (fallHeight + 1) * fallSpeed);
    } else if (key === "Enter") {
        initGame();
    }
}

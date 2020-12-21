import { PIECE, addNextPiece } from "./piece.js";
import { unit, height } from "./dimensions.js";
import { initGame, GAME } from "./game.js";
import { appears, remove } from "./utils.js";

const moveSpeed = 100;
const fallSpeed = 100 / 7;

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

function movecurrentPiece(key) {
    if (!PIECE.current || !PIECE.current.canMove) return;
    if (
        key === "ArrowLeft" &&
        PIECE.current.coordinates.every(([x, y]) =>
            appears([x - 1, y], GAME.allowedCoordinates)
        )
    ) {
        disableMove();
        for (let i = 0; i < 4; i++) {
            PIECE.current.coordinates[i][0]--;
            const x = PIECE.current.coordinates[i][0];
            PIECE.current.squares[i].animate({ left: x * unit }, moveSpeed);
            setTimeout(enableMove, moveSpeed);
        }
    } else if (
        key === "ArrowRight" &&
        PIECE.current.coordinates.every(([x, y]) =>
            appears([x + 1, y], GAME.allowedCoordinates)
        )
    ) {
        disableMove();
        for (let i = 0; i < 4; i++) {
            PIECE.current.coordinates[i][0]++;
            const x = PIECE.current.coordinates[i][0];
            PIECE.current.squares[i].animate({ left: x * unit }, moveSpeed);
            setTimeout(enableMove, moveSpeed);
        }
    } else if (
        key === "ArrowDown" &&
        PIECE.current.coordinates.every(([x, y]) =>
            appears([x, y + 1], GAME.allowedCoordinates)
        )
    ) {
        disableMove();
        for (let i = 0; i < 4; i++) {
            PIECE.current.coordinates[i][1]++;
            const y = PIECE.current.coordinates[i][1];
            PIECE.current.squares[i].animate({ top: y * unit }, moveSpeed);
            setTimeout(enableMove, moveSpeed);
        }
    } else if (key === "ArrowUp") {
        disableMove();
        let fallHeight = 0;
        while (
            PIECE.current.coordinates.every(([x, y]) =>
                appears([x, y + 1], GAME.allowedCoordinates)
            )
        ) {
            fallHeight++;
            for (let i = 0; i < 4; i++) {
                PIECE.current.coordinates[i][1]++;
                const y = PIECE.current.coordinates[i][1];
                PIECE.current.squares[i].animate({ top: y * unit }, fallSpeed, "linear");
            }
        }
        for (const coord of PIECE.current.coordinates) {
            remove(coord, GAME.allowedCoordinates);
        }
        setTimeout(() => {
            addNextPiece();
        }, fallHeight * fallSpeed);
    } else if (key === " ") {
        // todo: rotation
    } else if (key === "Enter") {
        initGame();
    }
}

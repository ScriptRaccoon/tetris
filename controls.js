import { PIECE, addNextPiece } from "./piece.js";
import { unit } from "./dimensions.js";
import { initGame, GAME } from "./game.js";
import { appears, remove, rotateBy90Degrees } from "./utils.js";

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

export function movecurrentPiece(key) {
    if (!PIECE.current || !PIECE.current.canMove) return;
    if (
        key === "ArrowLeft" &&
        PIECE.current.coordinates.every(([x, y]) =>
            appears([x - 1, y], GAME.allowedCoordinates)
        )
    ) {
        disableMove();
        PIECE.current.rotationCenter[0]--;
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
        PIECE.current.rotationCenter[0]++;
        for (let i = 0; i < 4; i++) {
            PIECE.current.coordinates[i][0]++;
            const x = PIECE.current.coordinates[i][0];
            PIECE.current.squares[i].animate({ left: x * unit }, moveSpeed);
            setTimeout(enableMove, moveSpeed);
        }
    } else if (key === "ArrowDown") {
        if (
            PIECE.current.coordinates.every(([x, y]) =>
                appears([x, y + 1], GAME.allowedCoordinates)
            )
        ) {
            PIECE.current.rotationCenter[1]++;
            disableMove();
            for (let i = 0; i < 4; i++) {
                PIECE.current.coordinates[i][1]++;
                const y = PIECE.current.coordinates[i][1];
                PIECE.current.squares[i].animate({ top: y * unit }, moveSpeed);
                setTimeout(enableMove, moveSpeed);
            }
        } else {
            for (const coord of PIECE.current.coordinates) {
                remove(coord, GAME.allowedCoordinates);
            }
            addNextPiece();
        }
    } else if (key === " ") {
        disableMove();
        let fallHeight = 0;
        while (
            PIECE.current.coordinates.every(([x, y]) =>
                appears([x, y + 1], GAME.allowedCoordinates)
            )
        ) {
            fallHeight++;
            PIECE.current.rotationCenter[1]++;
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
    } else if (key === "ArrowUp") {
        // rotation
        // todo: check collision *before* rotating
        // todo: animation
        const origin = PIECE.current.rotationCenter;
        for (let i = 0; i < 4; i++) {
            const [x, y] = rotateBy90Degrees(PIECE.current.coordinates[i], origin);
            PIECE.current.coordinates[i] = [x, y];
            PIECE.current.squares[i].css({
                left: x * unit,
                top: y * unit,
            });
        }
    } else if (key === "Enter") {
        initGame();
    }
}

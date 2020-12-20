import { PIECE, addNextPiece } from "./piece.js";
import { unit, height } from "./dimensions.js";
import { initGame } from "./game.js";

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
    if (key === "ArrowLeft") {
        disableMove();
        for (let i = 0; i < 4; i++) {
            PIECE.current.coordinates[i][0]--;
            const left = parseInt(PIECE.current.squares[i].css("left"));
            PIECE.current.squares[i].animate({ left: left - unit }, moveSpeed);
            setTimeout(enableMove, moveSpeed);
        }
    } else if (key === "ArrowRight") {
        disableMove();
        for (let i = 0; i < 4; i++) {
            PIECE.current.coordinates[i][0]++;
            const left = parseInt(PIECE.current.squares[i].css("left"));
            PIECE.current.squares[i].animate({ left: left + unit }, moveSpeed);
            setTimeout(enableMove, moveSpeed);
        }
    } else if (key === "ArrowDown") {
        disableMove();
        for (let i = 0; i < 4; i++) {
            PIECE.current.coordinates[i][1]++;
            const top = parseInt(PIECE.current.squares[i].css("top"));
            PIECE.current.squares[i].animate({ top: top + unit }, moveSpeed);
            setTimeout(enableMove, moveSpeed);
        }
    } else if (key === "ArrowUp") {
        // todo: fall on the next piece
        disableMove();
        let maxy = Math.max(...PIECE.current.coordinates.map((coord) => coord[1]));
        const diff = height - 1 - maxy;
        for (let i = 0; i < 4; i++) {
            PIECE.current.coordinates[i][1] += diff;
            const top = parseInt(PIECE.current.squares[i].css("top"));
            PIECE.current.squares[i].animate(
                { top: top + diff * unit },
                diff * fallSpeed,
                "linear"
            );
        }
        setTimeout(addNextPiece, diff * fallSpeed);
    } else if (key === " ") {
        // todo: rotation
    } else if (key === "Enter") {
        initGame();
    }
}

import { PIECE } from "./piece.js";
import { unit, height } from "./dimensions.js";
import { addNextPiece } from "./nextPiece.js";

const moveSpeed = 100;

export function addControls() {
    $(window).on("keydown", (e) => {
        movecurrentPiece(e.key);
    });
}

function enableMove() {
    PIECE.canMove = true;
}

function disableMove() {
    PIECE.canMove = false;
}

function movecurrentPiece(key) {
    if (!PIECE.canMove) return;
    const currentLeft = parseInt(PIECE.current.css("left"));
    const currentTop = parseInt(PIECE.current.css("top"));
    if (key === "ArrowLeft") {
        disableMove();
        PIECE.current.animate({ left: currentLeft - unit }, moveSpeed, enableMove);
    } else if (key === "ArrowRight") {
        disableMove();
        PIECE.current.animate({ left: currentLeft + unit }, moveSpeed, enableMove);
    } else if (key === "ArrowDown") {
        disableMove();
        PIECE.current.animate({ top: currentTop + unit }, moveSpeed, enableMove);
    } else if (key === "ArrowUp") {
        disableMove();
        PIECE.current.animate({ top: height * unit }, 2 * moveSpeed, () => {
            enableMove();
            addNextPiece();
        });
    } else if (key === " ") {
        disableMove();
        PIECE.angle += 90;
        PIECE.current.css({ transform: `rotate(${PIECE.angle}deg)` });
        setTimeout(enableMove, moveSpeed);
    }
}

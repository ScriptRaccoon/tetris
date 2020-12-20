import { PIECE, addNextPiece } from "./piece.js";
import { unit, height } from "./dimensions.js";

const moveSpeed = 100;

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
    if (!PIECE.current.canMove) return;
    // will later get this from the coordinates
    const currentLeft = parseInt(PIECE.current.drawing.css("left"));
    const currentTop = parseInt(PIECE.current.drawing.css("top"));
    if (key === "ArrowLeft") {
        disableMove();
        PIECE.current.drawing.animate(
            { left: currentLeft - unit },
            moveSpeed,
            enableMove
        );
    } else if (key === "ArrowRight") {
        disableMove();
        PIECE.current.drawing.animate(
            { left: currentLeft + unit },
            moveSpeed,
            enableMove
        );
    } else if (key === "ArrowDown") {
        disableMove();
        PIECE.current.drawing.animate({ top: currentTop + unit }, moveSpeed, enableMove);
    } else if (key === "ArrowUp") {
        disableMove();
        PIECE.current.drawing.animate({ top: height * unit }, 2 * moveSpeed, () => {
            enableMove();
            addNextPiece();
        });
    } else if (key === " ") {
        disableMove();
        PIECE.current.angle += 90;
        PIECE.current.drawing.css({ transform: `rotate(${PIECE.current.angle}deg)` });
        setTimeout(enableMove, moveSpeed);
    }
}

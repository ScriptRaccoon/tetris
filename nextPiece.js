import { randEl } from "./utils.js";
import { PIECES } from "./pieces.js";
import { PIECE } from "./piece.js";
import { width, middle, unit } from "./dimensions.js";

function calculateNextPiece() {
    const randomPiece = randEl(PIECES);
    PIECE.next = $("<div></div>")
        .addClass("piece")
        .addClass("currentPiece")
        .addClass(randomPiece.name)
        .css({
            left: (width + 2) * unit + "px",
            top: "0px",
        })
        .appendTo("#game");
}

export function addNextPiece() {
    if (!PIECE.next) calculateNextPiece();
    PIECE.angle = 0;
    PIECE.current = PIECE.next.css({
        left: middle * unit + "px",
        top: "0px",
    });
    calculateNextPiece();
}

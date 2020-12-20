import { randEl } from "./utils.js";
import { width, middle, unit } from "./dimensions.js";

const PIECES = [
    {
        name: "piece-O",
        coordinates: [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
        ],
    },
    {
        name: "piece-I",
        coordinates: [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
        ],
    },
    {
        name: "piece-L",
        coordinates: [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 2],
        ],
    },
    {
        name: "piece-J",
        coordinates: [
            [1, 0],
            [1, 1],
            [1, 2],
            [0, 2],
        ],
    },
    {
        name: "piece-Z",
        coordinates: [
            [0, 0],
            [1, 0],
            [1, 1],
            [2, 1],
        ],
    },
    {
        name: "piece-S",
        coordinates: [
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
        ],
    },
];

export const PIECE = {
    next: null,
    current: null,
};

function calculateNextPiece() {
    PIECE.next = JSON.parse(JSON.stringify(randEl(PIECES)));
    PIECE.next.drawing = $("<div></div>")
        .addClass("piece")
        .addClass(PIECE.next.name)
        .css({
            left: (width + 2) * unit + "px",
            top: "0px",
        })
        .appendTo("#game");
    return PIECE.next;
}

export function addNextPiece() {
    if (!PIECE.next) calculateNextPiece();
    PIECE.current = PIECE.next;
    PIECE.current.angle = 0;
    PIECE.top = 0;
    PIECE.left = middle;
    PIECE.current.drawing.css({
        left: middle * unit + "px",
        top: "0px",
    });
    PIECE.current.canMove = true;
    calculateNextPiece();
}

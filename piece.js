import { randEl } from "./utils.js";
import { width, middle, unit } from "./dimensions.js";

const PIECES = [
    {
        name: "piece-O",
        coordinates: [
            [1, 1],
            [1, 1],
        ],
        angle: 0,
    },
    {
        name: "piece-I",
        coordinates: [[1], [1], [1], [1]],
        angle: 0,
    },
    {
        name: "piece-L",
        coordinates: [
            [1, 0],
            [1, 0],
            [1, 1],
        ],
        angle: 0,
    },
    {
        name: "piece-J",
        coordinates: [
            [0, 1],
            [0, 1],
            [1, 1],
        ],
        angle: 0,
    },
    {
        name: "piece-Z",
        coordinates: [
            [1, 1, 0],
            [0, 1, 1],
        ],
        angle: 0,
    },
    {
        name: "piece-S",
        coordinates: [
            [0, 1, 1],
            [1, 1, 0],
        ],
        angle: 0,
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
}

export function addNextPiece() {
    if (!PIECE.next) calculateNextPiece();
    PIECE.current = PIECE.next;
    PIECE.current.drawing.css({
        left: middle * unit + "px",
        top: "0px",
    });
    PIECE.current.canMove = true;
    calculateNextPiece();
}

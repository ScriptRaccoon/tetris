import { randEl } from "./utils.js";
import { middle, unit } from "./dimensions.js";

const PIECES = [
    {
        name: "piece-O",
        coordinates: [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
        ],
        rotationCenter: [0.5, 0.5],
    },
    {
        name: "piece-I",
        coordinates: [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
        ],
        rotationCenter: [0, 1],
    },
    {
        name: "piece-L",
        coordinates: [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 2],
        ],
        rotationCenter: [0, 2],
    },
    {
        name: "piece-J",
        coordinates: [
            [1, 0],
            [1, 1],
            [1, 2],
            [0, 2],
        ],
        rotationCenter: [1, 2],
    },
    {
        name: "piece-Z",
        coordinates: [
            [0, 0],
            [1, 0],
            [1, 1],
            [2, 1],
        ],
        rotationCenter: [1, 1],
    },
    {
        name: "piece-S",
        coordinates: [
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
        ],
        rotationCenter: [1, 1],
    },
];

export const PIECE = {
    next: null,
    current: null,
};

function calculateNextPiece() {
    $("#nextPiece").html("");
    PIECE.next = JSON.parse(JSON.stringify(randEl(PIECES)));
    for (const coord of PIECE.next.coordinates) {
        const [x, y] = coord;
        $("<div></div>")
            .addClass("piece")
            .addClass(PIECE.next.name)
            .css({
                left: unit * x,
                top: unit * y,
            })
            .appendTo("#nextPiece");
    }
    return PIECE.next;
}

export function addNextPiece() {
    PIECE.current = PIECE.next ? PIECE.next : calculateNextPiece();
    PIECE.current.canMove = true;
    PIECE.current.squares = [];
    PIECE.current.rotationCenter[0] += middle;
    for (let i = 0; i < 4; i++) {
        const coord = PIECE.current.coordinates[i];
        coord[0] += middle;
        const square = $("<div></div>")
            .addClass("piece")
            .addClass(PIECE.current.name)
            .css({
                left: unit * coord[0],
                top: unit * coord[1],
            })
            .appendTo("#game");
        PIECE.current.squares.push(square);
    }
    calculateNextPiece();
}

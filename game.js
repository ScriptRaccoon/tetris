import { width, middle, height, unit } from "./dimensions.js";
import { movePiece } from "./controls.js";
import { Piece } from "./piece.js";

export class Game {
    constructor() {
        this.speed = 300;
        this.interval = null;
        this.map = [];
        this.piece = null;
        this.nextPiece = null;
        this.init();
        this.addControls();
    }

    hasFree(coord) {
        const [x, y] = coord;
        return x >= 0 && y >= 0 && x < width && y < height && this.map[y][x] === null;
    }

    init() {
        this.stopInterval();
        $(".piece").remove();
        this.map = new Array(height).fill(0).map((y) => new Array(width).fill(null));
        this.piece = null;
        this.nextPiece = null;
        this.blockedCoordinates = [];
        this.addNewPiece();
    }

    addControls() {
        $(window).on("keydown", (e) => {
            movePiece(e.key, this);
        });
    }

    startInterval() {
        this.interval = setInterval(movecurrentPiece("ArrowDown"), this.speed);
    }

    stopInterval() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    addNewPiece() {
        if (!this.nextPiece) {
            this.nextPiece = new Piece();
            this.nextPiece.drawAsNext();
        }
        this.piece = this.nextPiece;
        this.piece.translateX(middle);
        this.piece.draw({ firstTime: true });
        this.nextPiece = new Piece();
        this.nextPiece.drawAsNext();
    }

    finalizeMove() {
        this.freezePiece();
        this.checkTetris();
        this.addNewPiece();
        console.dir(this.map);
    }

    freezePiece() {
        for (const [x, y] of this.piece.coordinates) {
            this.map[y][x] = Piece.getSquareAt(x, y);
        }
    }

    checkTetris() {
        // todo
    }
}

// export function checkTetris() {
//     const yValues = Array.from(
//         new Set(PIECE.current.coordinates.map((coord) => coord[1]))
//     ).sort((a, b) => b - a);
//     const fullyLines = yValues.filter((y) =>
//         interval(0, width).every((x) => !appears([x, y], GAME.allowedCoordinates))
//     );
//     if (fullyLines.length === 0) return;
//     // remove lines
//     for (const y of fullyLines) {
//         for (const x of interval(0, width)) {
//             GAME.allowedCoordinates.push([x, y]);
//             const piece = getPieceAt(x, y);
//             piece.remove();
//         }
//         // todo: move lines above down
//         // ----> need to refactor the whole system
//     }
// }

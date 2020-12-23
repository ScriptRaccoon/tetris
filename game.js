import { width, middle, height, unit } from "./dimensions.js";
import { movePiece } from "./controls.js";
import { Piece } from "./piece.js";

export class Game {
    constructor() {
        this.intervalSpeed = 300;
        this.tetrisSpeed = 100;
        this.interval = null;
        this.map = [];
        this.piece = null;
        this.nextPiece = null;
        this.init();
        this.addControls();
    }

    logMap() {
        for (let y = 0; y < height; y++) {
            let s = y + ": ";
            for (let x = 0; x < width; x++) {
                if (this.map[y][x]) {
                    s += "*";
                } else {
                    s += "0";
                }
            }
            console.log(s);
        }
    }

    hasFree(coord) {
        const [x, y] = coord;
        return x >= 0 && y >= 0 && x < width && y < height && this.map[y][x] === null;
    }

    init() {
        this.stopInterval();
        $(".square").remove();
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
        this.interval = setInterval(movecurrentPiece("ArrowDown"), this.intervalSpeed);
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

    async finalizeMove() {
        this.freezePiece();
        this.checkTetris();
        this.addNewPiece();
    }

    freezePiece() {
        for (const [x, y] of this.piece.coordinates) {
            this.map[y][x] = Piece.getSquareAt(x, y);
        }
    }

    checkTetris() {
        let y = 0;
        while (y < height) {
            const isFullRow = this.map[y].every((square) => square != null);
            if (isFullRow) {
                for (let x = 0; x < width; x++) {
                    const square = this.map[y][x];
                    square.remove();
                }
                for (let z = y - 1; z > 0; z--) {
                    for (let x = 0; x < width; x++) {
                        const square = this.map[z][x];
                        if (square) {
                            square.animate(
                                { left: x * unit, top: (z + 1) * unit },
                                this.tetrisSpeed,
                                "linear"
                            );
                        }
                    }
                }
                this.map.splice(y, 1);
                this.map.unshift(new Array(width).fill(null));
            } else {
                y++;
            }
        }
    }
}

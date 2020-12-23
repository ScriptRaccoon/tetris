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
        this.numberPieces = 0;
        this.numberLines = 0;
        this.addControls();
        this.init();
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
        this.numberPieces = 0;
        $("#pieceCounter").text(0);
        this.numberLines = 0;
        $("#lineCounter").text(0);
        this.addNewPiece();
        this.startInterval("Playing");
        this.showLineRecord();
    }

    showLineRecord() {
        let record = parseInt(localStorage.getItem("lineRecord") || 0);
        record = Math.max(record, this.numberLines);
        localStorage.setItem("lineRecord", record);
        $("#lineRecordCounter").text(record);
    }

    addControls() {
        $(window).on("keydown", (e) => {
            movePiece(e.key, this, true);
        });
    }

    startInterval(message) {
        this.interval = setInterval(
            () => movePiece("ArrowDown", this, false),
            this.intervalSpeed
        );
        $("#statusMessage").text(message);
    }

    stopInterval(message) {
        clearInterval(this.interval);
        this.interval = null;
        $("#statusMessage").text(message);
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
        this.numberPieces++;
        $("#pieceCounter").text(this.numberPieces);
        this.checkGameOver();
    }

    checkGameOver() {
        const isGameOver = this.piece.coordinates.some(
            ([x, y]) => this.map[y][x] != null
        );
        if (isGameOver) {
            this.stopInterval("Gameover!");
        }
    }

    finalizeMove() {
        this.freezePiece();
        this.checkTetris();
        this.addNewPiece();
        this.showLineRecord();
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
                this.numberLines++;
                $("#lineCounter").text(this.numberLines);
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

    togglePause() {
        if (this.interval) {
            this.stopInterval("Paused");
        } else {
            this.startInterval("Playing");
        }
    }
}

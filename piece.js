import { randEl, rotate, antiRotate } from "./utils.js";
import { unit } from "./dimensions.js";
import { PIECES } from "./pieceTypes.js";

export class Piece {
    constructor() {
        const p = JSON.parse(JSON.stringify(randEl(PIECES)));
        this.name = p.name;
        this.coordinates = p.coordinates;
        this.rotationCenter = p.rotationCenter;
        this.squares = [];
        this.length = this.coordinates.length;
        this.canMove = true;
        this.moveSpeed = 100;
        this.fallSpeed = 100 / 7;
    }

    get moveMap() {
        return {
            ArrowLeft: ([x, y]) => [x - 1, y],
            ArrowRight: ([x, y]) => [x + 1, y],
            ArrowDown: ([x, y]) => [x, y + 1],
            ArrowUp: (coord) => rotate(coord, this.rotationCenter),
            x: (coord) => antiRotate(coord, this.rotationCenter),
        };
    }

    draw(options) {
        for (const coord of this.coordinates) {
            const square = $("<div></div>")
                .addClass("square")
                .addClass(this.name)
                .css({
                    left: unit * coord[0],
                    top: unit * coord[1],
                })
                .appendTo("#game");

            if (options && options.firstTime) {
                this.squares.push(square);
            }
        }
    }

    async drawMove(time) {
        const animations = [];
        for (let i = 0; i < this.length; i++) {
            const [x, y] = this.coordinates[i];
            const square = this.squares[i];
            animations.push(
                square.animate({ left: x * unit, top: y * unit }, time).promise()
            );
        }
        return Promise.all(animations);
    }

    drawAsNext() {
        $("#nextPiece").html("");
        for (const [x, y] of this.coordinates) {
            $("<div></div>")
                .addClass("square")
                .addClass(this.name)
                .css({
                    left: unit * x,
                    top: unit * y,
                })
                .appendTo("#nextPiece");
        }
    }

    translateX(offset) {
        this.rotationCenter[0] += offset;
        for (let i = 0; i < this.length; i++) {
            this.coordinates[i][0] += offset;
        }
    }

    static getSquareAt(x, y) {
        const piece = $("#game .square").filter(function () {
            return (
                parseInt($(this).css("left")) === x * unit &&
                parseInt($(this).css("top")) === y * unit
            );
        });
        return piece;
    }
}

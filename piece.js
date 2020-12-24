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

    drawFirstTime() {
        for (const coord of this.coordinates) {
            const square = $("<div></div>")
                .addClass("square")
                .addClass(this.name)
                .css({
                    left: unit * coord[0],
                    top: unit * coord[1],
                })
                .appendTo("#game");
            this.squares.push(square);
        }
    }

    async drawMove(time) {
        const animations = [];
        for (let i = 0; i < this.length; i++) {
            const [x, y] = this.coordinates[i];
            const square = this.squares[i];
            animations.push(
                square
                    .animate({ left: x * unit, top: y * unit }, time, "linear")
                    .promise()
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

    drawShadow(fallHeight) {
        $(".squareShadow").remove();
        for (const coord of this.coordinates) {
            const square = $("<div></div>")
                .addClass("square")
                .addClass("squareShadow")
                .addClass(this.name)
                .css({
                    left: unit * coord[0],
                    top: unit * (coord[1] + fallHeight),
                })
                .appendTo("#game");
        }
    }

    getFallHeight(game) {
        let movedCoordinates = this.coordinates.map(([x, y]) => [x, y + 1]);
        let fallHeight = 0;
        while (movedCoordinates.every((coord) => game.hasFree(coord))) {
            fallHeight++;
            movedCoordinates = movedCoordinates.map(([x, y]) => [x, y + 1]);
        }
        return fallHeight;
    }

    translateX(offset) {
        this.rotationCenter[0] += offset;
        for (let i = 0; i < this.length; i++) {
            this.coordinates[i][0] += offset;
        }
    }

    translateY(offset) {
        this.rotationCenter[1] += offset;
        for (let i = 0; i < this.length; i++) {
            this.coordinates[i][1] += offset;
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

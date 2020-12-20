import { randEl } from "./utils.js";

const unit = 30;
const width = 12;
const height = 25;
const middle = Math.floor((width - 1) / 2);

let currentPiece = null;
let currentAngle = 0;
let nextPiece = null;

let canMove = true;
const moveSpeed = 100;

const PIECES = [
    {
        name: "piece-O",
        coordinates: [], // todo
    },
    {
        name: "piece-I",
        coordinates: [], // todo
    },
    {
        name: "piece-L",
        coordinates: [], // todo
    },
    {
        name: "piece-J",
        coordinates: [], // todo
    },
    {
        name: "piece-Z",
        coordinates: [], // todo
    },
    {
        name: "piece-S",
        coordinates: [], // todo
    },
];

const PIECE_NAMES = PIECES.map((piece) => piece.name);

$(() => {
    addNextPiece();
    addControls();
});

function calculateNextPiece() {
    const pieceName = randEl(PIECE_NAMES);
    nextPiece = $("<div></div>")
        .addClass("piece")
        .addClass("currentPiece")
        .addClass(pieceName)
        .css({
            left: (width + 2) * unit + "px",
            top: "0px",
        })
        .appendTo("#game");
}

function addNextPiece() {
    if (!nextPiece) calculateNextPiece();
    currentAngle = 0;
    currentPiece = nextPiece.css({
        left: middle * unit + "px",
        top: "0px",
    });
    calculateNextPiece();
}

function movecurrentPiece(key) {
    if (!canMove) return;
    const currentLeft = parseInt(currentPiece.css("left"));
    const currentTop = parseInt(currentPiece.css("top"));
    if (key === "ArrowLeft") {
        disableMove();
        currentPiece.animate({ left: currentLeft - unit }, moveSpeed, enableMove);
    } else if (key === "ArrowRight") {
        disableMove();
        currentPiece.animate({ left: currentLeft + unit }, moveSpeed, enableMove);
    } else if (key === "ArrowDown") {
        disableMove();
        currentPiece.animate({ top: currentTop + unit }, moveSpeed, enableMove);
    } else if (key === "ArrowUp") {
        disableMove();
        // todo
        currentPiece.animate({ top: height * unit }, 2 * moveSpeed, () => {
            enableMove();
            addNextPiece();
        });
    } else if (key === " ") {
        disableMove();
        currentAngle += 90;
        currentPiece.css({ transform: `rotate(${currentAngle}deg)` });
        setTimeout(enableMove, moveSpeed);
    }
}

function addControls() {
    $(window).on("keydown", (e) => {
        movecurrentPiece(e.key);
    });
}

function enableMove() {
    canMove = true;
}

function disableMove() {
    canMove = false;
}

$("#infoButton").text("Show Keys");
$("#infoButton").click(() => {
    $("#keyInfos").toggle();
    const text = $("#infoButton").text();
    $("#infoButton").text(text == "Show Keys" ? "Hide Keys" : "Show Keys");
    let opacity = parseInt($("#game").css("opacity"));
    $("#game").css("opacity", 1.2 - opacity);
});

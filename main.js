import { randEl } from "./utils.js";

const unit = 30;
const width = 12;
const height = 25;
const middle = Math.floor((width - 1) / 2);

let currentPiece = null;
let currentAngle = 0;

let canMove = true;
const moveSpeed = 100;

const PIECES = [
    {
        name: "piece-O",
        coordinates: [],
    },
    {
        name: "piece-I",
        coordinates: [],
    },
    {
        name: "piece-L",
        coordinates: [],
    },
    {
        name: "piece-J",
        coordinates: [],
    },
    {
        name: "piece-Z",
        coordinates: [],
    },
    {
        name: "piece-S",
        coordinates: [],
    },
];

const PIECE_NAMES = PIECES.map((piece) => piece.name);

$(() => {
    addRandompiece();
    addControls();
});

function addRandompiece() {
    const pieceName = randEl(PIECE_NAMES);
    currentAngle = 0;
    currentPiece = $("<div></div>")
        .addClass("piece")
        .addClass("currentPiece")
        .addClass(pieceName)
        .css({
            left: middle * unit + "px",
            top: "0px",
        })
        .appendTo("#game");
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
            addRandompiece();
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
    let opacity = parseInt($("main").css("opacity"));
    $("main").css("opacity", 1.2 - opacity);
});

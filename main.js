import { randEl } from "./utils.js";

const unit = 30;
const width = 12;
const height = 25;
const middle = Math.floor((width - 1) / 2);

let currentTile = null;
let currentAngle = 0;

let canMove = true;
const moveSpeed = 100;

const TILES = [
    {
        name: "tile-O",
        coordinates: [],
    },
    {
        name: "tile-I",
        coordinates: [],
    },
    {
        name: "tile-L",
        coordinates: [],
    },
    {
        name: "tile-J",
        coordinates: [],
    },
    {
        name: "tile-Z",
        coordinates: [],
    },
    {
        name: "tile-S",
        coordinates: [],
    },
];

const TILE_NAMES = TILES.map((tile) => tile.name);

$(() => {
    addRandomTile();
    addControls();
});

function addRandomTile() {
    const tileName = randEl(TILE_NAMES);
    currentAngle = 0;
    currentTile = $("<div></div>")
        .addClass("tile")
        .addClass("currentTile")
        .addClass(tileName)
        .css({
            left: middle * unit + "px",
            top: "0px",
        })
        .appendTo("#game");
}

function moveCurrentTile(key) {
    if (!canMove) return;
    disableMove();
    const currentLeft = parseInt(currentTile.css("left"));
    const currentTop = parseInt(currentTile.css("top"));
    if (key === "ArrowLeft") {
        currentTile.animate({ left: currentLeft - unit }, moveSpeed, enableMove);
    } else if (key === "ArrowRight") {
        currentTile.animate({ left: currentLeft + unit }, moveSpeed, enableMove);
    } else if (key === "ArrowDown") {
        currentTile.animate({ top: currentTop + unit }, moveSpeed, enableMove);
    } else if (key === "ArrowUp") {
        // todo
        currentTile.animate({ top: height * unit }, 2 * moveSpeed, () => {
            enableMove();
            addRandomTile();
        });
    } else if (key === " ") {
        currentAngle += 90;
        currentTile.css({ transform: `rotate(${currentAngle}deg)` });
        setTimeout(enableMove, moveSpeed);
    }
}

function addControls() {
    $(window).on("keydown", (e) => {
        moveCurrentTile(e.key);
    });
}

function enableMove() {
    canMove = true;
}

function disableMove() {
    canMove = false;
}

// function rotateElement(element, angle, callback) {
//     let currentAngle = parseInt(element.css("transform"));
//     const steps = 100;
//     for (let )
//     currentAngle += angle/10;

//     console.log(currentAngle);

// }

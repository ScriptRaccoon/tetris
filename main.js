import { randEl } from "./utils.js";

const unit = 30;
const width = 12;
const height = 25;
const middle = Math.floor((width - 1) / 2);

let currentTile = null;

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

let canMove = true;
const moveSpeed = 100;

function moveCurrentTile(key) {
    if (!canMove) return;
    disableMove();
    const currentLeft = parseInt(currentTile.css("left"));
    const currentTop = parseInt(currentTile.css("top"));
    console.log(currentTile.css("top"));
    if (key === "ArrowLeft") {
        currentTile.animate({ left: currentLeft - unit + "px" }, moveSpeed, enableMove);
    } else if (key === "ArrowRight") {
        currentTile.animate({ left: currentLeft + unit + "px" }, moveSpeed, enableMove);
    } else if (key === "ArrowDown") {
        currentTile.animate({ top: currentTop + unit + "px" }, moveSpeed, enableMove);
    } else if (key === "ArrowUp") {
        // todo
        currentTile.animate({ opacity: 0.5 }, moveSpeed, enableMove);
        console.log("Needs to be implemented");
        addRandomTile();
    }
    console.log(currentTile.css("top"));
}

function addControls() {
    $(window).on("keydown", (e) => moveCurrentTile(e.key));
}

function enableMove() {
    canMove = true;
}

function disableMove() {
    canMove = false;
}

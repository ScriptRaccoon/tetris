import { randEl } from "./utils.js";

const unit = 30;
const width = 12;
const height = 25;
const middle = Math.floor((width - 1) / 2);

let currentTile = null;

function moveTileDown() {
    const currentTop = parseInt($(this).css("top"));
    $(this).animate({ top: currentTop + unit }, 100);
}

const TILE_NAMES = ["tile-I", "tile-T", "tile-B", "tile-L", "tile-J", "tile-Z", "tile-S"];

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
        })
        .appendTo("#game");
}

function moveCurrentTile(direction) {
    const currentLeft = parseInt(currentTile.css("left"));
    const currentTop = parseInt(currentTile.css("top"));
    if (direction === "left") {
        currentTile.css({ left: currentLeft - unit });
    } else if (direction === "right") {
        currentTile.css({ left: currentLeft + unit });
    } else if (direction === "down") {
        currentTile.css({ top: currentTop + unit });
    } else if (direction === "bottom") {
        // todo
        currentTile.css("opacity", 0.5);
        console.log("Needs to be implemented");
        addRandomTile();
    }
}

function addControls() {
    $(window).on("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            moveCurrentTile("left");
        } else if (e.key === "ArrowRight") {
            moveCurrentTile("right");
        } else if (e.key === "ArrowUp") {
            moveCurrentTile("bottom");
        } else if (e.key === "ArrowDown") {
            moveCurrentTile("down");
        }
    });
}

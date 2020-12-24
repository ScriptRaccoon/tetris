export async function movePiece(key, game, byPlayer) {
    if (key === "p") {
        game.togglePause();
        return;
    }
    if (key === "Enter") {
        game.init();
        return;
    }
    const piece = game.piece;

    if (!piece || !piece.canMove || game.isPaused) return;
    if (Object.keys(piece.moveMap).includes(key)) {
        // move or rotate
        const myMap = piece.moveMap[key];
        const movedCoordinates = piece.coordinates.map(myMap);
        if (movedCoordinates.every((coord) => game.hasFree(coord))) {
            if (byPlayer) piece.canMove = false;
            piece.coordinates = movedCoordinates;
            piece.rotationCenter = myMap(piece.rotationCenter);
            await piece.drawMove(game.pieceSpeed);
            if (byPlayer) piece.canMove = true;
        } else if (key === "ArrowDown") {
            game.finalizeMove();
        }
    } else if (key === " ") {
        // fall down
        if (byPlayer) piece.canMove = false;
        const fallHeight = piece.getFallHeight(game);
        piece.translateY(fallHeight);
        await piece.drawMove((fallHeight * game.pieceSpeed) / 7);
        game.finalizeMove();
    }

    const fallHeight = piece.getFallHeight(game);
    piece.drawShadow(fallHeight);
}

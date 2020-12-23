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
    if (!piece || !piece.canMove || !game.interval) return;
    if (Object.keys(piece.moveMap).includes(key)) {
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
        if (byPlayer) piece.canMove = false;
        const myMap = piece.moveMap["ArrowDown"];
        let movedCoordinates = piece.coordinates.map(myMap);
        let fallHeight = 0;
        while (movedCoordinates.every((coord) => game.hasFree(coord))) {
            fallHeight++;
            piece.coordinates = movedCoordinates;
            piece.rotationCenter = myMap(piece.rotationCenter);
            movedCoordinates = piece.coordinates.map(myMap);
        }
        await piece.drawMove((fallHeight * game.pieceSpeed) / 7);
        game.finalizeMove();
    }
}

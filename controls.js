export function movePiece(key, game) {
    const piece = game.piece;
    if (!piece || !piece.canMove) return;
    if (Object.keys(piece.moveMap).includes(key)) {
        const myMap = piece.moveMap[key];
        const movedCoordinates = piece.coordinates.map(myMap);
        if (movedCoordinates.every((coord) => game.hasFree(coord))) {
            piece.canMove = false;
            piece.coordinates = movedCoordinates;
            piece.rotationCenter = myMap(piece.rotationCenter);
            piece.drawMove();
            setTimeout(() => {
                piece.canMove = true;
            }, piece.moveSpeed);
        } else if (key === "ArrowDown") {
            game.finalizeMove();
        }
    } else if (key === " ") {
        piece.canMove = false;
        const myMap = piece.moveMap["ArrowDown"];
        let movedCoordinates = piece.coordinates.map(myMap);
        let fallHeight = 0;
        while (movedCoordinates.every((coord) => game.hasFree(coord))) {
            fallHeight++;
            piece.coordinates = movedCoordinates;
            piece.rotationCenter = myMap(piece.rotationCenter);
            movedCoordinates = piece.coordinates.map(myMap);
        }
        piece.drawMove({ time: fallHeight * piece.fallSpeed });
        setTimeout(() => {
            game.finalizeMove();
        }, fallHeight * piece.fallSpeed);
    } else if (key === "Enter") {
        game.init();
    }
}

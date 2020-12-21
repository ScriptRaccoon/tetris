export function randInt(a, b) {
    return a + Math.floor(Math.random() * (b - a));
}

export function randEl(list) {
    const i = randInt(0, list.length);
    return list[i];
}

export function appears(a, list) {
    return list.some((el) => el[0] == a[0] && el[1] == a[1]);
}

export function remove(a, list) {
    let i = list.findIndex((el) => el[0] == a[0] && el[1] == a[1]);
    list.splice(i, 1);
}

export function rotateBy90Degrees(coord, origin) {
    const [x, y] = coord;
    const [u, v] = origin;
    return [y - v + u, u - x + v];
}

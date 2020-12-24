export function randEl(list) {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}

export function rotate(coord, origin) {
    const [x, y] = coord;
    const [u, v] = origin;
    return [u + v - y, x + v - u];
}

export function antiRotate(coord, origin) {
    const [x, y] = coord;
    const [u, v] = origin;
    return [y - v + u, u - x + v];
}

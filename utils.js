export function randInt(a, b) {
    return a + Math.floor(Math.random() * (b - a));
}

export function randEl(list) {
    const i = randInt(0, list.length);
    return list[i];
}

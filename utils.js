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

export function isSubset(list1, list2) {
    return list1.every((a) => appears(a, list2));
}

export function remove(a, list) {
    let i = list.findIndex((el) => el[0] == a[0] && el[1] == a[1]);
    list.splice(i, 1);
}

export function removeAll(list1, list2) {
    list1.forEach((a) => remove(a, list2));
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

export function interval(a, b) {
    const list = [];
    let x = a;
    while (x < b) {
        list.push(x);
        x++;
    }
    return list;
}

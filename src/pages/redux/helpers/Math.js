const precesion = 6;
function round(number) {
    let x = parseFloat(number);
    return parseFloat(x.toFixed(precesion));
}
function add(a, b) {
    let x = round(a);
    let y = round(b);
    return round(((x * `1e${precesion}`) + (y * `1e${precesion}`)) / `1e${precesion}`);
}
function sub(a, b) {
    let x = round(a);
    let y = round(b);
    return round(((x * `1e${precesion}`) - (y * `1e${precesion}`)) / `1e${precesion}`);
}
function mul(a, b) {
    let x = round(a);
    let y = round(b);
    return round((x) * (y));
}
function div(a, b) {
    let x = round(a);
    let y = round(b);
    return round((x) / (y ));
}

module.exports = {
    round,
    add,
    sub,
    mul,
    div
}
// dom 画方格
export const makeSquare = function() {
    let div = document.createElement("div");
    div.className = "square";
    return div;
}
// dom 画圆点
export const makeDot = function(row, col, width) {
    let div = document.createElement("div");
    div.className = "dot";
    div.style.position = "absolute";
    div.style.left = row * width - 15 + "px"
    div.style.top = col * width - 15 + "px";
    div.dataset.row = row;
    div.dataset.col = col;
    return div;
}
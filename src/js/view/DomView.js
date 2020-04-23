import BaseView from './BaseView'
import {makeSquare,makeDot} from './helper/domHelper'

class DomView extends BaseView {
    // 回调方法：游戏结束
    gameOver(flag) {
        const text = document.querySelector(".message .text");
        this.gameOverFlag = true;
        if (flag) {
            text.innerHTML = "White Wins";
        } else {
            text.innerHTML = "Black Wins";
        }

    }
    /**
     * 1.事件委托：为每个棋子盒子设置点击事件，事件具体响应逻辑在父类的同名方法中
     */
    initAddChess() {
        document.querySelector(".main").addEventListener("click", () => {
            if (event.target.className === "dot" && !this.gameOverFlag) {
                super.initAddChess(event.target.dataset.row - 0, event.target.dataset.col - 0, this.playerFlag);
            }
        })
    }
    /**
     * 2.为重新开始按钮设置点击事件，事件逻辑在reset方法中
     */
    initUI() {
        const button = document.querySelector(".button");
        button.addEventListener("click", this.reset.bind(this));
    }
    /**
     * 3.初始化棋盘
     */
    renderChessBoard() {
        let row;
        // 通过碎片添加
        let fragment = document.createDocumentFragment();
        // 初始化正方形棋盘：row*row
        for (let i = 0; i < this.row; i++) {
            // 添加行
            row = document.createElement("div");
            row.className = "row";
            for (let i = 0; i < this.row; i++) {
                // 添加列
                row.appendChild(makeSquare())
            }
            fragment.appendChild(row);
        }
        // 初始化正方形棋盘的每个点：row*row
        for (let i = 1; i < this.row; i++) {
            for (let j = 1; j < this.row; j++) {
                fragment.appendChild(makeDot(i, j, this.width));
            }
        }
        document.querySelector(this.root).appendChild(fragment);
    }

    /**
     * 回调方法：画出
     */
    renderChess(row, col) {
        let chess = document.createElement("div");
        chess.className = "chess";
        chess.style.position = "absolute";
        chess.style.left = row * (this.width) - 20 + "px";
        chess.style.top = col * (this.width) - 20 + "px";
        if (this.playerFlag) {
            chess.className += " chess-opposite";
        }
        this.playerFlag = !this.playerFlag
        document.querySelector(".main").appendChild(chess);
    }
    // 回调方法 && 方法抽取：重置游戏
    reset(flag) {
        super.reset();
        document.querySelector(".message .text").innerHTML = "";
        const parent = document.querySelector(this.root);
        Array.from(document.querySelectorAll(".chess")).map((node) => {
            parent.removeChild(node)
        })
    }

}

export default DomView

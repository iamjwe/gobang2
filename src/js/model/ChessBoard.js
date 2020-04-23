import Controller from "../controller/controller"

class ChessBoard{
    constructor(row) {
        this.row = row || this.row
        this.model = Array.from(Array(this.row + 7)).map(() => Array.from(Array(this.row + 7)))
        // // 事件绑定：添加棋子
        // this.emitter.on("addChess", this.onAddChess.bind(this));
        // // 事件绑定：重新开始
        // this.emitter.on("resetModel", this.reset.bind(this));
    }
    addChess(row,col,flag){
        if (!this.model[row + 4][col + 4]) {
            this.model[row + 4][col + 4] = Number(flag)
            // this.emitter.emit("viewAddChess", row, col)// 通知观察者（回调函数数组）触发添加棋子事件
            // if (this.isWin(row + 4, col + 4, flag)) {
            //     this.emitter.emit("gameOver", flag)// 通知观察者（回调函数数组）游戏结束
            // }
            return;
        }
        return false;
    }
    reset(){
        this.model = Array.from(Array(this.row + 7)).map(() => Array.from(Array(this.row + 7)))
    }
    isWin(row,col,flag){
        scanX(row - 4, col, 0, flag, false);
        scanY(row, col - 4, 0, flag, false);
        scanXY(row - 4, col - 4, 0, flag, false);
        scanYX(row - 4, col + 4, 0, flag, false)
        if (Controller.win) {
            Controller.win = false;
            return true;
        } else {
            return false;
        }
    }
}
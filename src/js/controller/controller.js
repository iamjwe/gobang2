let Controller = {
    row: 20,
    model: []
};

/**
 * 方法抽取：判断是否赢的具体判断方式
 */
const scannerMaker = function(scaner) {
    return function(x, y, count, playerFlag, continueFlag) {
        if (continueFlag) {
            if (Controller.model[x][y] == playerFlag) {
                count += 1;
                if (count === 5) {
                    Controller.win = true;
                } else {
                    scaner(x, y, count, playerFlag, continueFlag);
                }
            } else {
                return false;
            }
        } else {
            if (Controller.model[x][y] == playerFlag) {
                count += 1;
                continueFlag = true;
                scaner(x, y, count, playerFlag, continueFlag);
            } else {
                scaner(x, y, count, playerFlag, continueFlag);
            }
        }
    }
}


const scanX = scannerMaker(function(x, y, count, playerFlag, continueFlag) {
    scanX(x + 1, y, count, playerFlag, continueFlag)
});
const scanY = scannerMaker(function(x, y, count, playerFlag, continueFlag) {
    scanY(x, y + 1, count, playerFlag, continueFlag)
});
const scanXY = scannerMaker(function(x, y, count, playerFlag, continueFlag) {
    scanXY(x + 1, y + 1, count, playerFlag, continueFlag)
});
const scanYX = scannerMaker(function(x, y, count, playerFlag, continueFlag) {
    scanYX(x + 1, y - 1, count, playerFlag, continueFlag)
});

Controller.init = function(row) {
    this.row = row || this.row;
    // 二维数组存放数据
    this.model = Array.from(Array(this.row + 7)).map(() => Array.from(Array(this.row + 7)));
    // 事件绑定：添加棋子
    this.emitter.on("addChess", this.onAddChess.bind(this));
    // 事件绑定：重新开始
    this.emitter.on("resetModel", this.reset.bind(this));
};

// 事件回调：model重置回调
Controller.reset = function() {
	this.model = Array.from(Array(this.row + 7)).map(() => Array.from(Array(this.row + 7)));
}
// 事件回调：添加棋子
Controller.onAddChess = function(row, col, flag) {
    if (!this.model[row + 4][col + 4]) {
        this.model[row + 4][col + 4] = Number(flag)
        this.emitter.emit("viewAddChess", row, col)// 通知观察者（回调函数数组）触发添加棋子事件
        if (this.isWin(row + 4, col + 4, flag)) {
            this.emitter.emit("gameOver", flag)// 通知观察者（回调函数数组）游戏结束
        }
        return;
    }
    return false;
}
// 方法抽取：添加棋子后判断是否赢
Controller.isWin = function(row, col, flag) {
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
export default Controller

class BaseView {
    // 子类无构造函数，继承父类构造函数
    constructor(root, row, width, emitter) {
        // 发射器
        this.emitter = emitter;
        this.row = row || 20;
        this.width = width || 30;
        this.root = root;

        this.gameOverFlag = false;// 标记：游戏结束
        this.playerFlag = false;// 标记：黑白棋

        this.initAddChess();// 事件绑定：为每个棋子盒子设置点击事件
        this.initUI();// 事件绑定：为重新开始按钮设置点击事件
        // 事件通过emitter.on设置事件名及其回调（通过事件方式实现view->model->view，实现view对model的观察者模式）
        this.emitter.on("viewAddChess", this.renderChess.bind(this))// 父类内使用子类的方法：使用bind传入this指向调用者（子类）
        this.emitter.on("gameOver", this.gameOver.bind(this))
        this.emitter.on("resetView", this.reset.bind(this))

        this.renderChessBoard();
    }
    gameOver() {}
    initUI() {}
    reset () {
    	this.gameOverFlag = false;
       this.playerFlag = false;
    	this.emitter.emit("resetModel");
    }

    initAddChess(row, col, playerFlag) {
    	this.emitter.emit("addChess", row, col, playerFlag);
    }
    renderChess() {}
    renderChessBoard() {}
}

export default BaseView

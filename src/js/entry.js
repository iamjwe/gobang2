import DomView from "./view/DomView"
import controller from './controller/controller'
import util from './controller/util'
import '../css/index.css'

function init(config) {
    // 启动emitter
    controller.emitter = util.emitter;
    // 初始化棋盘（view的初始化显示，并注册view的观察者）
    const domView = new DomView(config.root, config.row, config.width, util.emitter);
    // 初始化棋盘数据，并注册数据变化的观察者
    controller.init(config.row);
}

init({
    row: 10,
    width: 60,
		root: ".main"
});

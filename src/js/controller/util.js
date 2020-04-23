let util = {}


util.emitter = (function() {
    let listeners = {}// 各种观察者集合
    return {
        // 自定义事件及其回调逻辑数组
        on: function(event, fn) {
            event = '$' + event;
            (listeners[event] || (listeners[event] = [])).push(fn)
        },
        // 注销事件
        off: function(event, fn) {
            event = '$' + event
            if (!arguments.length) {
                listeners = {}
            } else {
                const cbs = listeners[event]
                if (cbs) {
                    if (!fn) {
                        listeners[event] = null
                    } else {
                        for (let i = 0, l = cbs.length; i < l; i++) {
                            const cb = cbs[i]
                            if (cb === fn || cb.fn === fn) {
                                cbs.splice(i, 1)
                                break
                            }
                        }
                    }
                }
            }
        },
        // 触发事件
        emit: function(event) {
            event = '$' + event
            let cbs = listeners[event]
            if (cbs) {
                const args = [].slice.call(arguments, 1)
                cbs = cbs.slice()
                for (let i = 0, l = cbs.length; i < l; i++) {
                    cbs[i].apply(this, args)
                }
            }
        }
    }
})()

export default util

type Listener = (t: number) => void;
type FunItem = {
    fn: Listener;
    index: number;
};
const tick_time = 1000 / 30;

const fun_list: Set<FunItem> = new Set();
let looping = false;
let index = 0;

function update() {
    for (const item of fun_list) {
        item.fn(2);
    }
}

/** 创建游戏定时器, 用来做鱼|子弹更新位置 碰撞检测, 时间是固定的 */
export function createTick(fn: Listener) {
    if (!looping) {
        looping = true;
        Laya.timer.loop(tick_time, null, update);
    }
    index++;
    fun_list.add({
        fn,
        index,
    });

    return index;
}

export function clearTick(_index: number) {
    for (const item of fun_list) {
        if (item.index === _index) {
            fun_list.delete(item);
        }
    }

    if (fun_list.size === 0) {
        Laya.timer.clear(null, update);
        looping = false;
    }
}

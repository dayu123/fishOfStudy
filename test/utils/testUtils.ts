/** 检测stage上点击元素 */
export function stageClick() {
    Laya.stage.on('click', null, (e: Event) => {
        console.log(`test:>`, e.target);
    });
}
export function sleep(time: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time * 1000);
    });
}

let test_ignore_arr: string[] = [];
/** 测试是否需要跳过 */
export function getTestIgnore() {
    if (!test_ignore_arr.length) {
        const test_str = Laya.Utils.getQueryString('test_ignore');
        if (!test_str) {
            return test_ignore_arr;
        }
        test_ignore_arr = test_str.split(',');
    }
    return test_ignore_arr;
}

let test_enable_arr: string[] = [];
/** 测试开启 */
export function getTestEnable() {
    if (!test_enable_arr.length) {
        const test_str = Laya.Utils.getQueryString('test_enable');
        if (!test_str) {
            return test_enable_arr;
        }
        test_enable_arr = test_str.split(',');
    }
    return test_enable_arr;
}

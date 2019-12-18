/**
 * 鱼群的中正弦曲线的方程展示
 * https://www.desmos.com/calculator/9d6sebwwly
 * 方程1和方程2的psd鱼的间距有问题, 而且里面的鱼混乱在一起
 * 我无法分割上下正弦曲线中的鱼, 我只好自己生成想要的数据
 * 根据鱼的数目/2, 得出上下鱼的个数 通过鱼的全部距离得出鱼的间距...
 */
let writeFile = require('./writeFile');
const shoal_data = require('./shoal3.data.json');

let result_data = {};
let bounds = shoal_data.bounds;
let all_width = bounds.width + 1334;
let result_fish = [];

let fish_list = shoal_data.fish;

/**方程1一条曲线鱼的个数*/
let fun1_num = 100 / 2; // fun1鱼的个数是100个
/**方程1鱼的type是11号鱼*/
let fun1_type = 11;
/**方程1鱼的起点*/
let fun1_start_pos = {
    x: 106,
    y: 61,
};
/**方程1每条鱼的间距*/
let fun1_all_space = 2028;
let fun1_item_space = fun1_all_space / fun1_num;

/**方程2鱼的type是2号鱼*/
let fun2_type = 2;
/**方程2一条曲线鱼的个数*/
let fun2_num = 96 / 2; // fun2鱼的个数是96个
/**方程1鱼的起点*/
let fun2_start_pos_x = 121;
/**方程2每条鱼的间距*/
let fun2_all_space = 1657;
let fun2_item_space = fun2_all_space / fun2_num;

for (let i = 0; i < fun1_num; i++) {
    // 每一个i生成上下两条数据
    let fish_top_data = generateFun1(i, 'top');
    let fish_bottom_data = generateFun1(i, 'bottom');
    result_fish.push(fish_top_data, fish_bottom_data);
}
for (let i = 0; i < fun2_num; i++) {
    // 每一个i生成上下两条数据
    let fish_top_data = generateFun2(i, 'top');
    let fish_bottom_data = generateFun2(i, 'bottom');
    result_fish.push(fish_top_data);
    result_fish.push(fish_bottom_data);
}

let fish1_arr = [];
let fish2_arr = [];

for (let i = 0; i < fish_list.length; i++) {
    let fish_item = fish_list[i];

    if (fish_item.funType == 'fun1') {
        fish1_arr.push(fish_item);
    }
    if (fish_item.funType == 'fun2') {
        fish2_arr.push(fish_item);
    }
    if (fish_item.funType == 'fun3') {
        let fish_data = analysisFun3(fish_item);
        result_fish.push(fish_data);
    }
}

console.log(`fun1 fish num: ${fish1_arr.length}`);
console.log(`fun2 fish num: ${fish2_arr.length}`);

/**
 * 正弦11号鱼的数据生成
 * @param {number} index 鱼的index
 * @param {'top'|'bottom'} position 鱼的位置
 */
function generateFun1(index, position) {
    let start_x = fun1_item_space * index;

    let startTimeRadio = start_x / all_width;
    let endTimeRadio = (start_x + 1334) / all_width;

    // let fn_p_arr = [121, 1907, fun1_all_space];
    // let fn_space_arr = [121, 1801 - 121, fun1_all_space - 1801];
    // let fn_a_arr = [500, 149, 500];
    // let fn_w_arr = [800, 560, 800];
    // let fn_d_arr = [279, 159, 999];

    /**因为要在离开屏幕的时候将鱼清除, 所以最多游1334, 第三个函数超出屏幕范围所以不做处理*/
    let fn_p_arr = [121, 1334];
    let fn_space_arr = [121, 1334 - 121];
    let fn_a_arr = [500, 149];
    let fn_w_arr = [800, 560];
    let fn_d_arr = [279, 159];
    let fn_arr = [];
    for (let i = 0; i < fn_space_arr.length; i++) {
        let d = (fn_d_arr[i] * 2 * Math.PI) / fn_w_arr[i];
        if (position == 'top') {
            d = Math.PI + d;
        }
        let e = i - 1 < 0 ? [0, fn_p_arr[i]] : [fn_p_arr[i - 1], fn_p_arr[i]];

        fn_arr.push({
            funNo: '1',
            len: fn_space_arr[i],
            funParam: [fn_a_arr[i], (2 * Math.PI) / fn_w_arr[i], 375, d, e],
        });
    }

    return {
        displaceType: 'function',
        typeId: fun1_type,
        isSpecial: false,
        startTimeRadio: startTimeRadio,
        endTimeRadio: endTimeRadio,
        funList: fn_arr,
    };
}
/**
 * 正弦2号鱼的数据生成
 * @param {number} index 鱼的index
 * @param {'top'|'bottom'} position 鱼的位置
 *
 */
function generateFun2(index, position) {
    let start_x = fun2_start_pos_x + fun2_item_space * index;

    let startTimeRadio = start_x / all_width;
    let endTimeRadio = (start_x + 1334) / all_width;

    let d = (19 * 2 * Math.PI) / 280;
    if (position == 'top') {
        d = Math.PI + d;
    }

    return {
        displaceType: 'function',
        typeId: fun2_type,
        isSpecial: false,
        startTimeRadio: startTimeRadio,
        endTimeRadio: endTimeRadio,
        funList: [
            {
                funNo: '1',
                len: 1334,
                funParam: [70, (2 * Math.PI) / 280, 375, d, [0, 1334]],
            },
        ],
    };
}

/**直线运动鱼的数据生成*/
function analysisFun3(fish_data) {
    let y = fish_data.startPos.y;
    /**鱼在鱼群中出现的闲时间*/
    let startTimeRadio = fish_data.startPos.x / all_width;
    /**鱼在鱼群中出现离开屏幕的时间*/
    let endTimeRadio = (fish_data.startPos.x + 1334) / all_width;

    return {
        displaceType: 'function',
        typeId: fish_data.typeId,
        isSpecial: fish_data.isSpecial,
        startTimeRadio: startTimeRadio,
        endTimeRadio: endTimeRadio,
        funList: [
            {
                funNo: '3',
                len: 1334,
                funParam: [
                    {
                        x: 1334,
                        y: y,
                    },
                    {
                        x: 0,
                        y: y,
                    },
                ],
            },
        ],
    };
}

result_data = {
    shoalId: '3',
    totalTime: 30,
    usedTime: 0,
    fish: result_fish,
};

writeFile('../../../server/primus/testData/shoal3.json', result_data);

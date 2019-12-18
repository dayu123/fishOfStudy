let writeFile = require('./writeFile');

/**鱼的数目, 左右内外各fish_num条*/
let fish_num = 15;
/**鱼游多少圈*/
let fish_circle_num = 5;

/**左右点游的弧度变化*/
let point_arr = [{
    x: 389,
    y: 374
  },
  {
    x: 973,
    y: 374
  }
];
let left_circle_dist = [Math.PI, 2 * Math.PI * (5 + 1 / 2)];
let right_circle_dist = [0, -2 * Math.PI * (5)];

/**特殊鱼和外圈的鱼的速度一样*/
let special_fish_begin_len = 389; // 开始游动的距离
let special_fish_middle_len = 0; // 中间游动的距离
let special_fish_end_len = 1334 - 389; // 最后游动的距离

/**外圈的信息*/
let out_radius = 198;
let out_fish_space = 2 * Math.PI * out_radius / fish_num;
/**单条鱼游动的距离*/
let out_fish_len = 750 + fish_circle_num * 2 * Math.PI * out_radius;
/**外圈鱼游动全部距离 = 垂直直线距离 750 + 游动的圆长度 + 15条鱼中间的距离 */
let out_all_len = out_fish_len + fish_num * out_fish_space;

let inner_radius = 114;
let inner_fish_space = 2 * Math.PI * inner_radius / fish_num;
/**单条鱼游动的距离*/
let inner_fish_len = 750 + fish_circle_num * 2 * Math.PI * inner_radius;
let inner_all_len = inner_fish_len + fish_num * inner_fish_space;

/**所有鱼游动的距离 外圈游动距离*/
let all_len = out_all_len + special_fish_end_len;
let all_inner_len = inner_all_len + special_fish_end_len * inner_all_len / out_all_len;

/**普通鱼每条鱼的间隔比例*/
let out_space_radio = out_fish_space / all_len;
let inner_space_radio = inner_fish_space / all_inner_len;

let inner_fish_type = '12';
let out_fish_type = '10';
let center_fish_type = '24';

/**特殊鱼出现的时间正好是 普通鱼游完第一圈的时候*/
let special_fish_start_startTimeRadio = (750 - 374 + 2 * Math.PI * out_radius) / all_len; // 第1段开始
let special_fish_start_endTimeRadio = (750 - 374 + 2 * Math.PI * out_radius + 389) / all_len; // 第1段结束
let special_fish_middle_startTimeRadio = (750 - 374 + 2 * Math.PI * out_radius + 389) / all_len; // 第2段开始
let special_fish_middle_endTimeRadio = 1 - special_fish_end_len / all_len; // 第2段结束
let special_fish_end_startTimeRadio = 1 - special_fish_end_len / all_len; // 第3段开始
let special_fish_end_endTimeRadio = 1; // 第3段结束

/**鱼游动的整个距离 虽然中间鱼没有游动但是 也算又动了, 用来作 给鱼前后添加 space, 生成比例的依据*/
let special_fish_len = all_len * (1 - special_fish_start_startTimeRadio); // 第3段结束

/**普通鱼最后消失的时间 -- 比例*/
let fish_end_endTimeRadio = special_fish_middle_endTimeRadio;

let special_startTimeRadio = (750 - 374 + 2 * Math.PI * out_radius) / all_len;
let special_endTimeRadio = 1;
/**特殊鱼出现占整个鱼群时间比例*/
let special_allTimeRadio = special_endTimeRadio - special_startTimeRadio;
// 第1段占整体比例
special_fish_start_radio = (special_fish_start_endTimeRadio - special_fish_start_startTimeRadio) / special_allTimeRadio;
// 第2段占整体比例
special_fish_middle_radio = (special_fish_middle_endTimeRadio - special_fish_middle_startTimeRadio) / special_allTimeRadio;
// 第3段占整体比例
special_fish_end_radio = (special_fish_end_endTimeRadio - special_fish_end_startTimeRadio) / special_allTimeRadio;

/**普通鱼*/
let fish_list = [];
for (let i = 0; i < fish_num; i++) {
  for (let j = 0; j < 4; j++) {
    let fish = {};
    let direction = 'left';
    let circle_pos = 'inner';
    if (j % 2 == 1) {
      circle_pos = 'out';
    }
    if (j < 2) {
      direction = 'right';
    }

    let funList = [];
    let fun = {};
    fun.funNo = '2';
    fish.displaceType = 'function';
    funParam = [];

    if (circle_pos == 'inner') {
      fish.typeId = '12';
      fish.startTimeRadio = i * inner_space_radio;
      fish.endTimeRadio = fish_end_endTimeRadio - (fish_num - i) * inner_space_radio;
      fun.len = inner_fish_len;
      funParam[1] = inner_radius;
    } else {
      fish.typeId = '10';
      fish.startTimeRadio = i * out_space_radio;
      fish.endTimeRadio = fish_end_endTimeRadio - (fish_num - i) * out_space_radio;
      fun.len = out_fish_len;
      funParam[1] = out_radius;
    }

    if (direction == 'left') {
      funParam[0] = point_arr[0];
      funParam[2] = left_circle_dist;
    } else {
      funParam[0] = point_arr[1];
      funParam[2] = right_circle_dist;
    }

    fun.funParam = funParam;
    funList.push(fun);
    fish.funList = funList;

    fish_list.push(fish);
  }
}

/**special fish*/
for (let i = 0; i < point_arr.length; i++) {
  let fish = {};
  fish.displaceType = 'function';
  fish.startTimeRadio = special_startTimeRadio;
  fish.endTimeRadio = special_endTimeRadio;
  fish.funList = [];
  fish.typeId = '24';

  let start_x = (i === 0 ? 0 : 1334);
  let end_x = (i === 0 ? 1334 : 0);
  let pos_x_arr = [start_x, point_arr[i].x, point_arr[i].x, end_x];
  let radio_x_arr = [special_fish_start_radio, special_fish_middle_radio, special_fish_end_radio];
  for (let j = 0; j < 3; j++) {
    let fun = {
      "funNo": "3",
      radio: radio_x_arr[j],
      len: radio_x_arr[j] * special_fish_len,
      funParam: [{
          "x": pos_x_arr[j],
          "y": point_arr[i].y
        },
        {
          "x": pos_x_arr[j + 1],
          "y": point_arr[i].y
        }
      ]
    };
    fish.funList.push(fun);
  }
  fish_list.push(fish);
}

let shoal = {
  shoalId: '2',
  totalTime: 30,
  usedTime: 0,
  fish: fish_list
};
writeFile('../../../server/primus/testData/shoal2.json', result_data);
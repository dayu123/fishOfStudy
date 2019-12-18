const shoal_data = require('./shoal1.data.json');
let writeFile = require('./writeFile');

let result_data = {};
let bounds = shoal_data.bounds;
let all_width = bounds.width + 1334;
let result_fish = [];

let fish_list = shoal_data.fish;

for (let i = 0; i < fish_list.length; i++) {
    let y = fish_list[i].startPos.y;
    let startTimeRadio = fish_list[i].startPos.x / all_width;
    let endTimeRadio = (fish_list[i].startPos.x + 1334) / all_width;

    result_fish.push({
        displaceType: 'function',
        typeId: fish_list[i].typeId,
        isSpecial: fish_list[i].isSpecial,
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
    });
}
result_data = {
    shoalId: '1',
    totalTime: 30,
    usedTime: 0,
    fish: result_fish,
};

writeFile('./shoal1.json', result_data);

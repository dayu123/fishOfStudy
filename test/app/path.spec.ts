import { PATH } from 'data/path';
import { Test } from 'testBuilder';
import { stage_width, stage_height } from 'utils/displace/displaceUtil';
import { SPRITE } from 'data/sprite';

export const path_test = new Test('path', runner => {
    /** 检测有问题的路径 */
    runner.describe('correct', () => {
        for (const key in PATH) {
            if (!PATH.hasOwnProperty(key)) {
                continue;
            }
            const item = PATH[key];
            const first = {
                x: item[0][0],
                y: item[0][1],
            };
            const last_p = item[item.length - 1].reverse();
            const end = {
                x: last_p[1],
                y: last_p[0],
            };
            item[item.length - 1].reverse();

            const fr = isRight(first);
            const er = isRight(end);
            if (!fr || !er) {
                console.log(`${key}: first:${fr}, end:${er}`, end);
            }
        }
    });

    runner.describe('sprite_offset', () => {
        const fish = SPRITE.fish;
        for (const key in fish) {
            if (!fish.hasOwnProperty(key)) {
                continue;
            }
            const item = fish[key];
            const { offset } = item;
            const [top, right, bottom, left] = offset;
            console.log(
                key,
                `width: ${left + right}`,
                `height:${top + bottom}`,
            );
        }
    });
});

function isRight(p: Point) {
    const { x, y } = p;
    if (x < 0) {
        return true;
    }
    if (x > stage_width) {
        return true;
    }
    if (y < 0) {
        return true;
    }
    if (y > stage_height) {
        return true;
    }

    return false;
}

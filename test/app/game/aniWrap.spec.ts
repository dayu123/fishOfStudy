import { range } from 'lodash';
import { Test } from 'testBuilder';
import { loopFreezing, stopFreezing } from 'view/scenes/game/ani_wrap/freezing';
import { activeFreezing } from 'view/scenes/game/ani_wrap/freezing';
import {
    activeShoalWave,
    stopShoalWave,
} from 'view/scenes/game/ani_wrap/shoalWave';
import { activeExploding } from 'view/scenes/game/ani_wrap/exploding';
import { activePosTip } from 'view/scenes/game/ani_wrap/posTip';
import { activeAim } from 'view/scenes/game/ani_wrap/aim';
import { modelState } from 'model/modelState';

/** 冰冻 鱼群 爆炸 瞄准...测试 */
export const ani_wrap = new Test('ani_wrap', runner => {
    runner.describe('active_freezing', () => {
        activeFreezing();
    });
    runner.describe('loop_freezing', () => {
        loopFreezing();
    });
    runner.describe('stop_freezing', () => {
        stopFreezing();
    });

    runner.describe('active_shoal_wave', () => {
        activeShoalWave();
    });
    runner.describe('active_reverse_shoal_wave', () => {
        activeShoalWave(true);
    });
    runner.describe('stop_shoal_wave', () => {
        stopShoalWave();
    });

    runner.describe('active_exploding', (pos: Point) => {
        const arr = range(5, 6);
        const x_space = 1920 / 10;
        const y_space = 750 / 10;
        for (const n of arr) {
            activeExploding({ x: x_space * n, y: y_space * n });
        }
    });

    runner.describe('pop_tip', () => {
        activePosTip();
    });
    runner.describe('aim', () => {
        const fish = [...modelState.app.game.fish_list][0];
        activeAim(fish, false, { x: 100, y: 100 });
    });
});

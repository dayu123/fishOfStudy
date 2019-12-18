import { createSprite } from 'utils/dataUtil';
import { playSkeleton } from 'utils/utils';
import { viewState } from 'view/viewState';

/** 鱼群的动画 */
let shoal_wave_ani: Laya.Skeleton;

/** 激活鱼群动画 */
export function activeShoalWave(reverse = false) {
    createShoalWaveAni();

    shoal_wave_ani.on(Laya.Event.STOPPED, shoal_wave_ani, () => {
        stopShoalWave();
    });
    if (reverse) {
        shoal_wave_ani.scaleX = -2;
    } else {
        shoal_wave_ani.scaleX = 2;
    }
    playSkeleton(shoal_wave_ani, 0, false);
}

/** 停止鱼群动画 */
export function stopShoalWave() {
    shoal_wave_ani.stop();
    shoal_wave_ani.removeSelf();
}

function createShoalWaveAni() {
    const { ani_wrap } = viewState;
    if (!shoal_wave_ani) {
        shoal_wave_ani = createSprite('other', 'shoal_wave') as Laya.Skeleton;
        shoal_wave_ani.scale(2, 2);
        shoal_wave_ani.pos(ani_wrap.width / 2, ani_wrap.height / 2);
        ani_wrap.addChild(shoal_wave_ani);
        shoal_wave_ani.alpha = 0.8;
    } else if (!shoal_wave_ani.parent) {
        ani_wrap.addChild(shoal_wave_ani);
    }
}

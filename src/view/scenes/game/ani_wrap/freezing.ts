import { createSprite } from 'utils/dataUtil';
import { playSkeleton } from 'utils/utils';
import { viewState } from 'view/viewState';

/** 冰冻的动画 */
let freezing_ani: Laya.Skeleton;
function createFreezingAni() {
    const { ani_wrap } = viewState;
    if (!freezing_ani) {
        freezing_ani = createSprite('other', 'freezing') as Laya.Skeleton;
        freezing_ani.scale(2, 2);
        freezing_ani.pos(ani_wrap.width / 2, ani_wrap.height / 2);
        ani_wrap.addChild(freezing_ani);
        freezing_ani.alpha = 0.8;
    } else if (!freezing_ani.parent) {
        ani_wrap.addChild(freezing_ani);
    }
}
export function activeFreezing() {
    createFreezingAni();
    freezing_ani.on(Laya.Event.STOPPED, freezing_ani, () => {
        loopFreezing();
    });

    playSkeleton(freezing_ani, 0, false);
}
export function loopFreezing() {
    createFreezingAni();
    playSkeleton(freezing_ani, 1, true);
}
export function stopFreezing() {
    freezing_ani.stop();
    freezing_ani.removeSelf();
}

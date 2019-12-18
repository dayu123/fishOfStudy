import { createSprite } from 'utils/dataUtil';
import { playSkeleton } from 'utils/utils';
import { viewState } from 'view/viewState';

/** 当前用户的位置的动画 */
let pop_tip_ani: Laya.Skeleton;
export function activePosTip() {
    createPosTip();
    playSkeleton(pop_tip_ani, 0, true);
    return pop_tip_ani;
}

export function stopPosTip() {
    if (!pop_tip_ani) {
        return;
    }
    pop_tip_ani.stop();
    pop_tip_ani.removeSelf();
}

function createPosTip() {
    const { ani_wrap } = viewState;
    if (!pop_tip_ani) {
        pop_tip_ani = createSprite('other', 'pos_tip') as Laya.Skeleton;
        ani_wrap.addChild(pop_tip_ani);
    } else if (!pop_tip_ani.parent) {
        ani_wrap.addChild(pop_tip_ani);
    }
}

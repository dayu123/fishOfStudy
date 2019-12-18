import { createSprite } from 'utils/dataUtil';
import { playSkeleton } from 'utils/utils';
import { viewState } from 'view/viewState';

/** 爆炸的动画 */
const exploding_ani_arr: Laya.Skeleton[] = [];
function createExplodingAni() {
    const { ani_wrap } = viewState;
    let exploding_ani = exploding_ani_arr.pop();
    if (!exploding_ani) {
        exploding_ani = createSprite('other', 'exploding') as Laya.Skeleton;
        exploding_ani.scale(2, 2);
        exploding_ani.pos(ani_wrap.width / 2, ani_wrap.height / 2);
        ani_wrap.addChild(exploding_ani);
        exploding_ani.alpha = 0.8;
    } else if (!exploding_ani.parent) {
        ani_wrap.addChild(exploding_ani);
    }
    return exploding_ani;
}
export function activeExploding(pos: Point) {
    const ani = createExplodingAni();

    ani.on(Laya.Event.STOPPED, ani, () => {
        recoverExploding(ani);
    });
    ani.pos(pos.x, pos.y);
    playSkeleton(ani, 0, false);
}

export function recoverExploding(ani: Laya.Skeleton) {
    ani.stop();
    ani.removeSelf();
    exploding_ani_arr.push(ani);
}

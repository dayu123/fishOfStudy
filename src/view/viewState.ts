import GameView from './scenes/game/gameView';
import SkillItemView from './scenes/game/skillItemView';

type ViewState = {
    game: GameView;
    /** 所有的动画的芙父容器 */
    ani_wrap: Laya.Box;
};

export const viewState = {} as ViewState;

export function addBullet(skin: string, rage: boolean) {
    return viewState.game.addBullet(skin, rage);
}
export function addNet(skin: string) {
    return viewState.game.addNet(skin);
}
export function getPoolMousePos() {
    return viewState.game.getPoolMousePos();
}
export function getSkillItemByIndex(idx: number) {
    return viewState.game.getSkillItemByIndex(idx);
}
export function getAutoLaunchSkillItem() {
    return viewState.game.getAutoLaunchSkillItem();
}
export function convertPosToNode(
    pos: Laya.Point,
    ori_node: Laya.Sprite,
    target_node: Laya.Sprite,
): Laya.Point {
    const global_p = ori_node.localToGlobal(pos, true);
    return target_node.globalToLocal(global_p, true);
}

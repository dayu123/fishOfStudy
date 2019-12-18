import { ComponentManager } from 'comMan/component';
import { modelState } from 'model/modelState';
import { SkillCoreCom, SkillInfo } from './skillCoreCom';
import { SkillModel } from './skillModel';

export type BombInfo = {
    fish_list: string[];
} & SkillInfo;

/** 炸弹技能: 提示用户选中屏幕的位置, 然后就发射炸弹 */
export class BombModel extends ComponentManager implements SkillModel {
    constructor(info: SkillInfo) {
        super();
        this.init(info);
    }
    public get skill_core() {
        return this.getCom(SkillCoreCom);
    }
    private init(info: SkillInfo) {
        this.addCom(new SkillCoreCom(info));
    }
    public active(info: SkillInfo) {
        // 激活
        const { skill_core } = this;
        const { game } = modelState.app;

        skill_core.active(info);
    }
    public disable() {
        const { skill_core } = this;
        skill_core.disable();
    }
}

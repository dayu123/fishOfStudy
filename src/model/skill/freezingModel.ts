import { ComponentManager } from 'comMan/component';
import { modelState } from 'model/modelState';
import { SkillCoreCom, SkillInfo } from './skillCoreCom';
import { SkillModel } from './skillModel';

type FreezingInfo = {
    fish_list: string[];
} & SkillInfo;
/** 冰冻技能 */
export class FreezingModel extends ComponentManager implements SkillModel {
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
    public active(info: FreezingInfo) {
        const { skill_core } = this;
        const { cool_time } = skill_core;
        const { used_time, fish_list } = info;
        const { game } = modelState.app;
        game.freezing_com.freezing(cool_time - used_time, fish_list);
        skill_core.active(info);
    }
    public disable() {
        const { skill_core } = this;
        skill_core.disable();
    }
}

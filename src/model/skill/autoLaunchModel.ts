import { ComponentManager } from 'comMan/component';
import { modelState } from 'model/modelState';
import { SkillCoreCom, SkillInfo, SkillStatus } from './skillCoreCom';
import { SkillModel } from './skillModel';

export type BombInfo = {
    fish_list: string[];
} & SkillInfo;

/** 炸弹技能: 提示用户选中屏幕的位置, 然后就发射炸弹 */
export class AutoLaunchModel extends ComponentManager implements SkillModel {
    constructor(info: SkillInfo) {
        super();
        this.init(info);
    }
    public get skill_core() {
        return this.getCom(SkillCoreCom);
    }
    private init(info: SkillInfo) {
        this.addCom(
            new SkillCoreCom({
                ...info,
            }),
        );
    }
    public toggle() {
        const { status } = this.skill_core;
        if (status === SkillStatus.Normal) {
            this.active();
        } else {
            this.disable();
        }
    }
    public active() {
        // 激活
        const { skill_core } = this;
        const { player } = this.skill_core;
        player.gun.autoLaunch.active();
        skill_core.active({
            used_time: 0,
        });
    }
    public disable() {
        const { skill_core } = this;
        const { player } = skill_core;
        player.gun.autoLaunch.clear();
        skill_core.disable();
    }
}

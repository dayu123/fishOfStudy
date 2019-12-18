import { ComponentManager } from 'comMan/component';
import { modelState, getCollisionFish, getFishById } from 'model/modelState';
import { SkillCoreCom, SkillInfo } from './skillCoreCom';
import { SkillModel } from './skillModel';

export type FreezingInfo = {
    fish: string;
    pre_active: boolean;
} & SkillInfo;

/** 冰冻技能 */
export class TrackFishModel extends ComponentManager implements SkillModel {
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
        // 激活
        const { skill_core } = this;
        const { player } = skill_core;
        const { fish } = info;
        const fish_model = getFishById(fish);

        player.gun.trackFish.track(fish_model, true);
        skill_core.active(info).then(() => {
            player.gun.trackFish.unTrack();
        });
    }
    public preActive() {}
    public disable() {
        const { skill_core } = this;
        skill_core.disable();
    }
}

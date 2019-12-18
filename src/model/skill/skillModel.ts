import { SkillCoreCom, SkillInfo } from './skillCoreCom';
import { TrackFishModel } from './trackFishModel';
import { BombModel } from './bombModel';
import { FreezingModel } from './freezingModel';
import { AutoLaunchModel } from './autoLaunchModel';

/** 技能的接口 */
export interface SkillModel {
    skill_core: SkillCoreCom;
    active(info: SkillInfo): void;
    disable(): void;
}

/** 技能的树... */
export const SkillMap = {
    1: TrackFishModel,
    2: FreezingModel,
    3: BombModel,
    4: AutoLaunchModel,
};

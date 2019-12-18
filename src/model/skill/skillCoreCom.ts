import { setProps } from 'utils/utils';
import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';
import { clearCount, startCount } from 'utils/count';
import { PlayerModel } from 'model/playerModel';

/** 技能的状态 */
export enum SkillStatus {
    /** 正常状态 */
    Normal = 'normal',
    /** 激活状态1 */
    Active1 = 'active_1',
    /** 激活状态2 */
    Active2 = 'active_2',
    /** 激活状态3 */
    Active3 = 'active_3',
    /** 激活状态4 */
    Active4 = 'active_4',
}
/** 技能属性 */
export type SkillInfo = {
    item_id?: string;
    /** 技能的状态, 多个状态 用来处理需要多步处理的技能...
     * status = 0 1 2.. 禁用状态...
     */
    status?: SkillStatus;
    num?: number;
    cool_time?: number;
    used_time?: number;
    player?: PlayerModel;
};

/** 技能的事件 */
export const SkillEvent = {
    UpdateInfo: 'update_info',
    StatusChange: 'status_change',
    UpdateRadio: 'update_radio',
};
export class SkillCoreCom extends ComponentManager {
    /** 技能对应的id */
    public item_id: string;
    /** 数目 */
    public num: number;
    /** 冷却时间 */
    public cool_time: number = 0;
    /** 冷却已经使用的时间 */
    public used_time: number = 0;
    /** count index */
    public count_index: number;
    /** 技能的状态 */
    public status = SkillStatus.Normal;
    /** 所属的用户... */
    public player: PlayerModel;
    constructor(skill_info: SkillInfo) {
        super();
        this.init();
        this.updateInfo(skill_info);
    }
    public get event() {
        return this.getCom(EventCom);
    }
    private init() {
        const event = new EventCom();
        this.addCom(event);
    }
    /** 更新数据 */
    public updateInfo(skill_info: SkillInfo) {
        setProps(this as SkillCoreCom, { ...skill_info });
        this.event.emit(SkillEvent.UpdateInfo, skill_info);
    }
    /** 设置技能的状态 */
    public setStatus(status: SkillStatus) {
        if (this.status === status) {
            return;
        }
        this.status = status;
        this.event.emit(SkillEvent.StatusChange, status);
    }
    public active(info?: SkillInfo) {
        return new Promise((resolve, reject) => {
            this.updateInfo(info);
            const { cool_time, event } = this;
            const { used_time } = info;
            /** 倒计时的时间间隔 */
            const count_delta = 0.03;
            const remain_time = cool_time - used_time;

            this.setStatus(SkillStatus.Active1);
            this.count_index = startCount(
                remain_time,
                count_delta,
                (rate: number) => {
                    const radio = rate * (remain_time / cool_time);
                    event.emit(SkillEvent.UpdateRadio, radio);
                    if (radio === 0) {
                        resolve();
                    }
                },
            );
        });
    }
    /** 禁用 */
    public disable() {
        this.setStatus(SkillStatus.Normal);
        clearCount(this.count_index);
    }
    /** 清除 */
    public destroy() {
        this.setStatus(SkillStatus.Normal);
        clearCount(this.count_index);
    }
}

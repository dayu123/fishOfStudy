import { FishModel } from 'model/fishModel';
import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';

export const ShoalEvent = {
    /** 添加鱼群前的清理 */
    PreAddShoal: 'pre_add_shoal',
};

/** 鱼群的处理逻辑 */
export class ShoalCom extends ComponentManager {
    /** 鱼群的数据 一个鱼群id 只能同时存在一个 */
    public shoal_map: Map<string, Set<FishModel>> = new Map();
    constructor() {
        super();
    }
    public get event() {
        let event_com = this.getCom(EventCom);
        if (!event_com) {
            event_com = new EventCom();
            this.addCom(event_com);
        }
        return event_com;
    }
    /** 添加鱼群前 处理 */
    public preAddShoal() {}
    /** 添加鱼群 */
    public addShoal(shoal_info: ServerShoalInfo) {}
    /** 清理鱼群 */
    public removeShoal(shoal_id: string) {
        this.shoal_map.delete(shoal_id);
    }
    /** 生成鱼群中的鱼 */
    private genFish() {}
    public destroy() {}
}

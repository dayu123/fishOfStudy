import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';
import { TimeoutCom } from 'comMan/timeoutCom';
import { BodyCom } from '../com/bodyCom';
import { getShapes } from '../com/bodyComUtil';
import { ModelEvent } from '../modelEvent';
import { BulletModel } from './bulletModel';
import { getCollisionAllFish } from 'model/modelState';

export type NetInfo = {
    show_cast: boolean;
    pos: Point;
};
export const NetEvent = {
    CastFish: 'cast_fish',
};
/** 鱼网数据类 */
export class NetModel extends ComponentManager {
    /** 位置 */
    public readonly pos: Point;
    /** 炮等级 */
    public readonly level: number;
    /** 炮皮肤 */
    public readonly skin: string;
    /** 是否显示 cast fish 的状态  */
    public show_cast: boolean;
    /** 炮皮肤 */
    public readonly level_skin: string;
    constructor(info: NetInfo, bullet: BulletModel) {
        super();

        const { show_cast, pos } = info;
        this.level = bullet.level;
        this.skin = bullet.skin;
        this.level_skin = bullet.level_skin;
        this.show_cast = show_cast;
        this.pos = pos;
        this.init();
    }
    public get body() {
        return this.getCom(BodyCom);
    }
    public get event() {
        return this.getCom(EventCom);
    }
    private init() {
        const { level, show_cast } = this;
        const shapes = getShapes('net', level);
        const body_com = new BodyCom(shapes);
        body_com.update(this.pos);
        const timeout_com = new TimeoutCom();
        this.addCom(new EventCom(), new TimeoutCom(), body_com);

        if (show_cast) {
            /** 做成异步, 不然信息 netCtrl 无法接受到 */
            timeout_com.createTimeout(() => {
                const fish_list = getCollisionAllFish(body_com);
                for (const fish of fish_list) {
                    fish.beCast();
                }
                this.event.emit(NetEvent.CastFish, fish_list);
            }, 0);
        }

        timeout_com.createTimeout(() => {
            this.destroy();
        }, 100);
    }
    public destroy() {
        this.event.emit(ModelEvent.Destroy);
        super.destroy();
    }
}

import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';
import { FishSpriteInfo } from 'data/sprite';
import * as SAT from 'sat';
import { getSpriteInfo } from 'utils/dataUtil';
import { DisplaceInfo } from 'utils/displace/displace';
import { BodyCom } from './com/bodyCom';
import { getShapes } from './com/bodyComUtil';
import { GameModel } from './gameModel';
import { ModelEvent } from './modelEvent';

export const FishEvent = {
    /** 移动 */
    Move: 'move',
    /** 被网住 */
    BeCast: 'be_cast',
    /** 被捕获 */
    BeCapture: 'be_capture',
    /** 状态改变 */
    StatusChange: 'status_change',
};
export type FishMoveData = {
    pos: Point;
    velocity: SAT.Vector;
};

export type FishData = {
    typeId: string;
    fishId: string;
    move_com: MoveCom;
};
/** 鱼的状态 */
export enum FishStatus {
    Normal,
    Freezed,
    QuickLeave,
    Dead,
}
export class FishModel extends ComponentManager {
    /** 唯一标示 */
    public id: string;
    /** 鱼的类型 */
    public type: string;
    /** 位置 */
    public pos: Point;
    /** 方向 */
    public velocity: SAT.Vector;
    /** 鱼的状态 */
    private status = FishStatus.Normal;
    /** 是否水平翻转 */
    public horizon_turn = false;
    /** 移动控制器, */
    private move_com: MoveCom;
    private game: GameModel;
    constructor(data: FishData, game: GameModel) {
        super();

        this.game = game;
        this.init(data);
    }
    public get event() {
        return this.getCom(EventCom);
    }
    public get body() {
        return this.getCom(BodyCom);
    }
    private init(data: FishData) {
        const { typeId, fishId, move_com } = data;
        this.type = typeId;
        this.id = fishId;

        move_com.onUpdate(this.onMoveChange);
        const sprite_info = getSpriteInfo('fish', typeId) as FishSpriteInfo;
        let horizon_turn = false;
        if (sprite_info.ani_type === 'horizon_turn') {
            horizon_turn = true;
        }
        const shapes = getShapes('fish', Number(typeId));
        const body_com = new BodyCom(shapes, horizon_turn);

        this.horizon_turn = horizon_turn;
        this.move_com = move_com;
        this.addCom(new EventCom(), move_com, body_com);
    }
    private onMoveChange = (displace_info: DisplaceInfo) => {
        const body_com = this.getCom(BodyCom);
        const { pos, velocity, is_end: is_complete, out_stage } = displace_info;
        if (is_complete) {
            return this.destroy();
        }
        if (out_stage) {
            return;
        }

        this.pos = pos;
        this.velocity = velocity;

        body_com.update(pos, velocity);
        this.event.emit(FishEvent.Move, {
            pos,
            velocity,
        } as MoveInfo);
    }; // tslint:disable-line: semicolon
    /** 被网住 */
    public setStatus(status: FishStatus) {
        if (status === this.status) {
            return;
        }
        this.status = status;
        this.event.emit(FishEvent.StatusChange, status);

        if (status === FishStatus.Freezed) {
            this.move_com.stop();
        } else {
            this.move_com.start();
        }
    }
    /** 被网住 */
    public beCast() {
        if (this.event) {
            this.event.emit(FishEvent.BeCast);
        }
    }
    /** 被捉住 */
    public beCapture() {
        if (this.event) {
            this.event.emit(FishEvent.BeCast);
        }
    }
    public destroy() {
        this.game.removeFish(this);
        this.event.emit(ModelEvent.Destroy);
        super.destroy();
    }
}

import { FishEvent, FishModel, FishStatus } from 'model/fishModel';
import { vectorToDegree } from 'utils/mathUtils';
import { ModelEvent } from 'model/modelEvent';
import { createRedFilter, playSkeleton, stopSkeleton } from 'utils/utils';
import { ComponentManager } from 'comMan/component';
import { TimeoutCom } from 'comMan/timeoutCom';
import { getSpriteInfo } from 'utils/dataUtil';
import { FishSpriteInfo } from 'data/sprite';
/** 鱼的控制器 */
export class FishCtrl extends ComponentManager {
    /** view是否水平是翻转  */
    private view_horizon_turn = false;
    /**
     * @param view 鱼对应的动画
     * @param model 鱼对应的model
     */
    constructor(private view: Laya.Skeleton, private model: FishModel) {
        super();
        this.init();
    }
    private init() {
        const { view } = this;
        view.play(0, true);
        this.addCom(new TimeoutCom());
        this.initEvent();
    }
    private initEvent() {
        const timeout_com = this.getCom(TimeoutCom);
        const event = this.model.event;
        const { view } = this;
        event.on(FishEvent.Move, this.syncPos);
        event.on(FishEvent.BeCast, () => {
            view.filters = [createRedFilter()];
            timeout_com.createTimeout(() => {
                view.filters = [];
            }, 500);
        });
        event.on(FishEvent.BeCapture, () => {
            this.beCapture();
        });
        event.on(FishEvent.StatusChange, (status: FishStatus) => {
            if (status === FishStatus.Freezed) {
                stopSkeleton(view);
            } else {
                playSkeleton(view, 0, true);
            }
        });
        event.on(ModelEvent.Destroy, () => {
            this.destroy();
        });
    }
    private syncPos = () => {
        const { view } = this;
        const { pos, velocity, horizon_turn } = this.model;
        const angle = vectorToDegree(velocity) + 90;
        if (horizon_turn) {
            /** angle(-90 - 90) + 90 = 0-180 */
            const need_scale_x = angle > 0 && angle < 180;
            view.scaleX = need_scale_x ? -1 : 1;
        } else {
            view.rotation = angle;
        }

        view.pos(pos.x, pos.y);
    }; // tslint:disable-line
    public beCapture() {
        // 被网住的逻辑
    }
    public destroy() {
        const { view } = this;
        view.destroy();
        super.destroy();
    }
}

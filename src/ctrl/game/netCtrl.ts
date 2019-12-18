import { NetModel } from 'model/gun/netModel';
import { ModelEvent } from 'model/modelEvent';
import { playSkeleton } from 'utils/utils';

/** 子弹的控制器 */
export class NetCtrl {
    /**
     * @param view 玩家对应的动画
     * @param model 玩家对应的model
     */
    constructor(private view: Laya.Skeleton, private model: NetModel) {
        this.init();
    }
    private init() {
        const { view, model } = this;
        const { level_skin } = model;

        const { x, y } = model.pos;
        view.pos(x, y);
        playSkeleton(view, level_skin, false);
        this.initEvent();
    }
    private initEvent() {
        const { view } = this;
        const { event } = this.model;

        event.on(ModelEvent.Destroy, () => {
            setTimeout(() => {
                view.destroy();
            }, 1000);
        });
    }
}

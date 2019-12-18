import { Displace, DisplaceInfo } from 'utils/displace/displace';
import { clearTick, createTick } from 'utils/tick';

/** 移动更新函数 */
type MoveUpdateFn = (move_info: DisplaceInfo) => void;

/** 固定路径 移动控制 */
export class MoveDisplaceCom implements MoveCom {
    private displace: Displace;
    private tick_index: number;
    private is_stop = false;
    private update_fn: MoveUpdateFn;
    constructor(displace: Displace) {
        this.displace = displace;
        this.tick_index = createTick(t => {
            const { is_stop, update_fn } = this;
            if (is_stop) {
                return;
            }
            const info = this.displace.update(t);
            update_fn(info);
        });
    }
    /** 绑定更新 */
    public onUpdate(update_fn: MoveUpdateFn) {
        this.update_fn = update_fn;
    }

    public start() {
        this.is_stop = false;
    }
    public stop() {
        this.is_stop = true;
    }
    public destroy() {
        clearTick(this.tick_index);
    }
}

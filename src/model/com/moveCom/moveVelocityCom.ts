import SAT from 'sat';
import { clearTick, createTick } from '../../../utils/tick';
import { config } from 'data/config';

/** 速度 移动控制 */
export class MoveVelocityCom {
    private pos: Point;
    private velocity: SAT.Vector;
    private update_fn: MoveUpdateFn;
    private tick_index: number;
    /** 停止 */
    private is_stop = false;
    constructor(pos: Point, velocity: SAT.Vector, update_fn: MoveUpdateFn) {
        this.pos = pos;
        this.velocity = velocity;
        this.update_fn = update_fn;

        this.tick_index = createTick(this.update.bind(this));
    }
    public update(t: number) {
        const { pos, velocity, is_stop } = this;
        if (is_stop) {
            return;
        }

        pos.x += velocity.x * t;
        pos.y += velocity.y * t;
        this.detectHitWall();
        this.update_fn({ pos, velocity });
    }
    public detectHitWall() {
        const { pool_height, pool_width } = config;
        const velocity = this.velocity;
        const pos = this.pos;
        let { x, y } = velocity;
        // 如果x<0 || x>1334 velocity x 改变方向
        if (pos.x > pool_width || pos.x < 0) {
            if (pos.x > pool_width) {
                pos.x = pool_width - (pos.x - pool_width);
                x = -Math.abs(velocity.x);
            }
            if (pos.x < 0) {
                pos.x = -pos.x;
                x = Math.abs(velocity.x);
            }
        }
        // 如果y<0 || y>750 velocity y 改变方向
        if (pos.y > pool_height || pos.y < 0) {
            if (pos.y > pool_height) {
                pos.y = pool_height - (pos.y - pool_height);
                y = -Math.abs(velocity.y);
            }
            if (pos.y < 0) {
                pos.y = -pos.y;
                y = Math.abs(velocity.y);
            }
        }
        this.velocity = new SAT.Vector(x, y);
        this.pos = pos;
    }

    public stop() {
        this.is_stop = true;
    }
    public start() {
        this.is_stop = false;
    }

    public destroy() {
        clearTick(this.tick_index);
    }
}

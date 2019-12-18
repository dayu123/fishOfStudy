import * as SAT from 'sat';
import { clearTick, createTick } from 'utils/tick';
import { config } from 'data/config';

export interface TrackTarget {
    pos: Point;
}
export type OnHit = (target: TrackTarget) => void;
/** 追踪目标 移动控制 */
export class MoveTrackCom implements MoveCom {
    private target: TrackTarget;
    private pos: Point;
    /** 初始位置, 为了计算追踪子弹有没有击中目标 */
    private start_pos: Point;
    private velocity: SAT.Vector;
    private update_fn: MoveUpdateFn;
    private on_hit: OnHit;
    private tick_index: number;
    /** 停止 */
    private is_stop = false;
    constructor(
        pos: Point,
        velocity: SAT.Vector,
        target: TrackTarget,
        update_fn: MoveUpdateFn,
        on_hit: OnHit,
    ) {
        this.target = target;
        this.pos = pos;
        this.start_pos = { ...pos };
        this.velocity = velocity;
        this.update_fn = update_fn;
        this.on_hit = on_hit;

        this.tick_index = createTick(this.update.bind(this));
    }
    private update(t: number) {
        const { target, pos, is_stop } = this;
        if (is_stop) {
            return;
        }
        const { x, y } = pos;
        const { x: tx, y: ty } = target.pos;
        const velocity = new SAT.Vector(tx - x, ty - y)
            .normalize()
            .scale(config.bullet_speed);

        pos.x += velocity.x * t;
        pos.y += velocity.y * t;
        this.velocity = velocity;

        if (this.detectOnHit()) {
            this.update_fn({ pos: this.pos, velocity });
            this.on_hit(target);
        } else {
            this.update_fn({ pos: this.pos, velocity });
        }
    }
    private detectOnHit() {
        const { pos, start_pos, target } = this;
        const { pos: track_pos } = target;

        const vector_start = new SAT.Vector(
            track_pos.x - start_pos.x,
            track_pos.y - start_pos.y,
        ).normalize();
        const vector_now = new SAT.Vector(
            track_pos.x - pos.x,
            track_pos.y - pos.y,
        ).normalize();

        const dot_start_now = vector_now.dot(vector_start);

        if (dot_start_now > 0) {
            return false;
        }
        this.pos = track_pos;
        return true;
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

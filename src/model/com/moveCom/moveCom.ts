interface MoveInfo {
    pos?: Point;
    velocity?: SAT.Vector;
}
interface MoveCom {
    /** 更新位置 */
    onUpdate(move_fn: MoveUpdateFn);
    start(): void;
    stop(): void;
    destroy(): void;
}

type MoveUpdateFn = (move_info: MoveInfo) => void;

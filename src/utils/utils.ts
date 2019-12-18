import { Observable, Subscriber } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

export function isFunc(func: Func<void>): boolean {
    return func && typeof func === 'function';
}

export function callFunc<T extends (...params: any[]) => void>(
    func: T,
    ...params: Parameters<T>
) {
    if (!isFunc(func)) {
        return;
    }
    func(...params);
}

/** set object properties */
export function setProps<T>(data: T, props: Partial<T>) {
    for (const key in props) {
        if (!props.hasOwnProperty(key)) {
            continue;
        }
        data[key] = props[key];
    }
}

/**
 * 在按钮上绑定事件, 防止多次点击事件导致
 * @param node 绑定的节点
 * @param event 绑定的事件
 * @param callback 执行函数
 * @param once 是否执行一次
 * @param throttle 间隔的时间 默认1s
 */
export function onNode(
    node: Laya.Sprite,
    event: string,
    callback: (event?: Laya.Event) => void,
    once?: boolean,
    throttle = 1000,
) {
    let once_observer: Subscriber<Laya.Event>;
    const observer = new Observable((_observer: Subscriber<Laya.Event>) => {
        node.on(event, node, (_event: Laya.Event) => {
            /** 按钮置灰 */
            if ((node as Laya.Image).gray === true) {
                return;
            }
            (node as Laya.Image).gray = true;
            setTimeout(() => {
                if (node.destroyed) {
                    return;
                }
                (node as Laya.Image).gray = false;
            }, throttle);

            _observer.next(_event);
            once_observer = _observer;
            if (once) {
                _observer.complete();
            }
        });
    });

    observer
        .pipe(throttleTime(throttle || 1000))
        .subscribe((_event: Laya.Event) => {
            if (node.destroyed) {
                if (once_observer) {
                    once_observer.complete();
                }
                return;
            }

            callback(_event);
        });
}

/** 停止骨骼动画, 如果是拖到页面上的 一开始无法停止 需要特殊处理` */
export function stopSkeleton(ani: Laya.Skeleton) {
    if (ani.player) {
        ani.stop();
        return;
    }
    ani.once(Laya.Event.PLAYED, ani, () => {
        setTimeout(() => {
            ani.stop();
        });
    });
}
/** 播放骨骼动画, 如果是拖到页面上的 一开始播放 需要特殊处理` */
type Params = [any, boolean, boolean?, number?, number?, boolean?];

export function playSkeleton(ani: Laya.Skeleton, ...params: Params) {
    if (ani.player) {
        ani.play(...params);
        return;
    }
    ani.once(Laya.Event.PLAYED, ani, () => {
        setTimeout(() => {
            ani.play(...params);
        });
    });
}

export function playSkeletonOnce(ani: Laya.Skeleton, ani_name: string) {
    return new Promise((resolve, reject) => {
        ani.once(Laya.Event.STOPPED, ani, () => {
            resolve();
        });
        if (ani.player) {
            ani.play(ani_name, false);
            return;
        }

        ani.once(Laya.Event.PLAYED, ani, () => {
            setTimeout(() => {
                ani.play(ani_name, false);
            });
        });
    });
}

/** 改变骨骼动画的url */
export function utilSkeletonLoadUrl(ani: Laya.Skeleton, url: string) {
    return new Promise((resolve, reject) => {
        ani.load(
            url,
            new Laya.Handler(ani, () => {
                resolve();
            }),
        );
    });
}

export function createRedFilter() {
    // prettier-ignore
    const redMat = [
        0.5, 0.5, 0.5, 0, 0, // R
        0, 0, 0, 0, 0, // G
        0, 0, 0, 0, 0, // B
        0, 0, 0, 1, 0, // A
    ];

    // 创建一个颜色滤镜对象,红色
    return new Laya.ColorFilter(redMat);
}
export function createGLowRedFilter() {
    return new Laya.GlowFilter('#ff0000', 10, 0, 0);
}

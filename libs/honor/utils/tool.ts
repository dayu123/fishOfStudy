/** 在class的fun执行之后执行fun */
export function injectAfter<T extends {}, K extends ObjFilterKeys<T, Function>>(
    instance: T,
    fun_name: K,
    func: Func<any>,
) {
    const ori_fun = instance[fun_name] as Func<any>;
    instance[fun_name] = function(...params: any[]) {
        const result = ori_fun.apply(this, [...params]);
        if (result instanceof Promise) {
            result.then(() => {
                func(this, result, ...params);
            });
        } else {
            func(this, result, ...params);
        }
        return result;
    } as any;
}

export function injectProto<T extends {}, K extends ObjFilterKeys<T, Function>>(
    ctor: Ctor<T>,
    fun_name: K,
    func: Func<any>,
    once?: boolean,
) {
    const ori_fun = ctor.prototype[fun_name];
    ctor.prototype[fun_name] = function(...params: any[]) {
        const result = ori_fun.apply(this, [...params]);
        if (result instanceof Promise) {
            result.then(() => {
                func(this, result, ...params);
            });
        } else {
            func(this, result, ...params);
        }
        if (once) {
            ctor.prototype[fun_name] = ori_fun;
        }
        return result;
    };
}

/** 之所以要这个处理, 为了解决外嵌模式需要loadScene本身的资源, 干净的类 class不需要
 *  所有通过 loadScene 有没有调用来监听
 * 这是hack的方法
 */
export function createScene(ctor: Ctor<Laya.Scene>): Promise<Laya.Scene> {
    return new Promise((resolve, reject) => {
        let is_load = false;
        /** 监听 */
        injectProto(
            ctor,
            'loadScene',
            () => {
                is_load = true;
            },
            true,
        );

        const instance = new ctor();
        if (!is_load && nodeIsReady(instance)) {
            return resolve(instance);
        }
        instance.once('onViewCreated', this, () => {
            return resolve(instance);
        });
    }) as Promise<Laya.Scene>;
}

export function nodeIsReady(node: Laya.Node) {
    return (node as any)._getBit(/*laya.Const.NOT_READY*/ 0x08);
}

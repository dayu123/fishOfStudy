export type FunProgress = (progress: number) => void;
export type ResItem = {
    url: string;
    type: string;
};

/** 加载资源... */
export function loadRes(res: ResItem[] | string[], on_progress?: FunProgress) {
    return new Promise((resolve, reject) => {
        let loading_fun: Laya.Handler;
        if (on_progress) {
            loading_fun = new Laya.Handler(
                null,
                (val: number) => {
                    on_progress(val);
                },
                null,
                false,
            );
        }
        const loaded_fn = new Laya.Handler(this, () => {
            setImmediate(resolve);
        });

        Laya.loader.load(res, loaded_fn, loading_fun);
    });
}

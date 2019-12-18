import { DEBUG_MODE } from '../index';
import {
    dialogManager,
    loaderManager,
    sceneManager,
    untilInit,
} from '../state';
import { ResItem } from '../utils/loadRes';
import { DialogRefUrl } from './dialogManager';
import { SceneChangeListener, SceneRefUrl } from './SceneManager';
import { HonorDialogConfig, HonorScene, ViewType } from './view';

export class DirectorCtor {
    public init() {
        Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
        this.onResize();
    }

    private onResize() {
        const { width, height } = Laya.stage;
        sceneManager.onResize(width, height);
    }
    /**
     * 运行场景
     * @param url 场景的url
     * @param params 场景 onMounted 接收的参数
     */
    public runScene(
        url: SceneRefUrl,
        ...params: any[]
    ): Promise<Laya.Scene | void> {
        return sceneManager.runScene(url, ...params).catch(err => {
            if (DEBUG_MODE) {
                console.error(err);
            }
        });
    }
    /**
     * 获取当前正在运行场景
     * @param url 场景的url
     * .3.3..
     * @param params 场景 onMounted 接收的参数
     */
    get runningScene(): HonorScene {
        return sceneManager.getCurScene();
    }
    /**
     * 打开弹出层
     * @param url 弹出层
     * @param params 场景 onMounted 接收的参数
     * @param config 弹出层的配置
     * @param use_exist 使用打开弹出层弹出层
     * @param show_effect 是否使用打开动画
     */
    public openDialog(
        url: DialogRefUrl,
        params: any[] = [],
        config: HonorDialogConfig = {},
        use_exist = false,
        show_effect = true,
    ) {
        return dialogManager.openDialog(
            url,
            params,
            config,
            use_exist,
            show_effect,
        );
    }
    public load(res: ResItem[] | string[], type?: ViewType) {
        return loaderManager.load(res, type);
    }

    public getDialogByName(name: string) {
        return dialogManager.getDialogByName(name);
    }

    public getDialogsByGroup(group: string) {
        return dialogManager.getDialogsByGroup(group);
    }

    public closeDialogByName(name: string) {
        dialogManager.closeDialogByName(name);
    }

    public closeDialogsByGroup(group: string) {
        dialogManager.closeDialogsByGroup(group);
    }

    public closeAllDialogs() {
        dialogManager.closeAllDialogs();
    }

    public setLoadViewVisible(type: ViewType, visible: boolean, force = false) {
        loaderManager.setLoadViewVisible(type, visible, force);
    }
    /** 设置scene loading页面
     */
    public setLoadPageForScene(url: string) {
        return loaderManager.setLoadView('Scene', url);
    }
    /** 设置dialog loading 页面
     */
    public setLoadPageForDialog(url: string) {
        return loaderManager.setLoadView('Dialog', url);
    }
    public async clearDialog(fn: SceneChangeListener) {
        await untilInit();
        sceneManager.sceneChangeAfterListener.push(fn);
    }
    public async onSceneChangeBefore(fn: SceneChangeListener) {
        await untilInit();
        sceneManager.sceneChangeBeforeListener.push(fn);
    }
    public async onSceneChangeAfter(fn: SceneChangeListener) {
        await untilInit();
        sceneManager.sceneChangeAfterListener.push(fn);
    }
    public async clearListener(fn: SceneChangeListener) {
        await untilInit();
        sceneManager.sceneChangeBeforeListener = sceneManager.sceneChangeBeforeListener.filter(
            item => {
                return item !== fn;
            },
        );
        sceneManager.sceneChangeAfterListener = sceneManager.sceneChangeAfterListener.filter(
            item => {
                return item !== fn;
            },
        );
    }
    /** 隐藏遮罩 */
    public hideDialog(visible: boolean) {
        dialogManager.hideMask(visible);
    }
}

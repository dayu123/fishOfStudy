import { initState, director } from './state';
import { utils } from './utils/index';
import { loadRes } from './utils/loadRes';
export {
    HonorDialog,
    HonorDialogConfig,
    HonorScene,
    HonorLoadScene,
} from './ui/view';

export type GameConfig = any;
export type HonorExternConfig = {
    versionPath?: string;
    defaultVersion?: string;
};
const name = 'Honor';
const version = '0.0.1-beta';
let DEBUG_MODE = false;

declare global {
    interface Window {
        Laya3D: any;
    }
}

/** 运行游戏
 * @param game_config 是Laya自动生成的游戏配置 src/GameConfig
 * @param extern_config Honor 需要的配置
 */
async function run(
    game_config: GameConfig,
    extern_config: HonorExternConfig = {},
) {
    // 根据IDE设置初始化引擎
    if (window.Laya3D) {
        Laya3D.init(game_config.width, game_config.height);
    } else {
        Laya.init(game_config.width, game_config.height, Laya.WebGL);
    }
    Laya.stage.frameRate = Laya.Stage.FRAME_SLOW;
    if (Laya.Physics) {
        Laya.Physics.enable();
    }
    if ((Laya as any).DebugPanel) {
        (Laya as any).DebugPanel.enable();
    }
    Laya.stage.scaleMode = game_config.scaleMode;
    Laya.stage.screenMode = game_config.screenMode;
    Laya.stage.alignV = game_config.alignV;
    Laya.stage.alignH = game_config.alignH;
    // 兼容微信不支持加载scene后缀场景
    Laya.URL.exportSceneToJson = game_config.exportSceneToJson;

    // 打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
    if (game_config.debug || Laya.Utils.getQueryString('debug') === 'true') {
        DEBUG_MODE = true;
        Laya.enableDebugPanel();
    } else {
        DEBUG_MODE = false;
    }

    if (game_config.physicsDebug && Laya.PhysicsDebugDraw) {
        Laya.PhysicsDebugDraw.enable();
    }
    if (game_config.stat) {
        Laya.Stat.show();
    }
    Laya.alertGlobalError = false;

    let { defaultVersion } = extern_config;
    defaultVersion = defaultVersion || '0';
    Laya.URL.customFormat = (url: string) => {
        const version_map = Laya.URL.version || {};
        if (url.indexOf('data:image') < 0) {
            if (url.indexOf('?') < 0 && url.indexOf('?v=') < 0) {
                let v = version_map[url];
                if (!v && defaultVersion) {
                    v = defaultVersion;
                }
                url += '?v=' + v;
            }
        }
        return url;
    };

    const start_task: Array<Promise<any>> = [];
    // 激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
    const fileconfig_task = new Promise((resolve, reject) => {
        Laya.AtlasInfoManager.enable(
            'fileconfig.json',
            Laya.Handler.create(null, async () => {
                resolve();
            }),
        );
    });
    start_task.push(fileconfig_task);

    const { versionPath } = extern_config;
    if (versionPath) {
        start_task.push(loadRes([versionPath]));
    }

    await Promise.all(start_task);

    if (versionPath) {
        Laya.URL.version = Laya.loader.getRes(versionPath);
    }

    initState();
}

export default { name, version, run, director, utils, DEBUG_MODE };

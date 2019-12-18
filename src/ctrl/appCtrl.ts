import { config } from 'data/config';
import GameConfig from 'GameConfig';
// import honor from 'honor';
import { HallCtrl } from './start/hallCtrl';
import { AppModel } from 'model/appModel';
import { ctrlState } from './ctrlState';
import { res, font_list } from 'data/res';
import honor from 'honor';
import { SocketCtrl } from 'honor/net/Socket';

export class AppCtrl {
    public model: AppModel;
    private view = Laya.stage;
    public socket: SocketCtrl;
    constructor() {
        this.startApp();
    }
    public startApp() {
        ctrlState.app = this;
        this.model = new AppModel();

        return this.startHonor().then(() => {
            HallCtrl.preEnter();
        });
    }
    /** 初始化 honor */
    private async startHonor() {
        await honor.run(GameConfig, {
            defaultVersion: config.cdn_version,
        });

        const task1 = honor.director.setLoadPageForScene(
            'scenes/loading.scene',
        );
        // const task2 = honor.director.setLoadPageForDialog('scenes/loading.scene');
        const task2 = honor.director.load(res.font).then(() => {
            honor.utils.registerFontSize(font_list);
        });
        await Promise.all([task1, task2]);
    }
    public enterGame() {
        return this.model.enterGame();
    }
}

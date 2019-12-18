import Start from 'view/scenes/startView';
import { GameCtrl } from '../game/gameCtrl';

export class HallCtrl {
    private view: Start;
    constructor(view: Start) {
        this.view = view;
        this.init();
    }
    public static async preEnter() {
        const view = (await Start.preEnter()) as Start;
        const ctrl = new HallCtrl(view);
    }
    private init() {
        const { btn_back } = this.view;
        const { CLICK } = Laya.Event;

        btn_back.on(CLICK, this, () => {
            GameCtrl.preEnter();
        });
    }
}

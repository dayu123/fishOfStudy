import { ctrlState } from 'ctrl/ctrlState';
import { res } from 'data/res';
import honor from 'honor';
import { ResItem } from 'honor/utils/loadRes';
import { FishModel } from 'model/fishModel';
import { GameEvent, GameModel } from 'model/gameModel';
import { PlayerModel } from 'model/playerModel';
import { setProps } from 'utils/utils';
import GameView from 'view/scenes/game/gameView';
import { FishCtrl } from './fishCtrl';
import { PlayerCtrl } from './playerCtrl';

/** 游戏ctrl */
export class GameCtrl {
    public view: GameView;
    private model: GameModel;
    constructor(view: GameView, model: GameModel) {
        this.view = view;
        this.model = model;
        this.init();
    }
    public static async preEnter() {
        const view = (await GameView.preEnter()) as GameView;
        await honor.director.load(res.game as ResItem[]);
        const game_model = ctrlState.app.enterGame();
        const game_ctrl = new GameCtrl(view, game_model);
        setProps(ctrlState, { game: game_ctrl });
    }
    private init() {
        this.initEvent();
    }
    private initEvent() {
        const event = this.model.event;
        const { view } = this;
        event.on(GameEvent.AddFish, (fish: FishModel) => {
            const fish_view = view.addFish(fish.type, fish.horizon_turn);
            const ctrl = new FishCtrl(fish_view, fish);
        });
        event.on(GameEvent.AddPlayer, (player: PlayerModel) => {
            if (player.is_cur_player && player.server_index > 1) {
                view.upSideDown();
            }
            const player_view = view.addGun(player.gun.skin);
            const ctrl = new PlayerCtrl(player_view, player);
        });
    }
}

import { GameModel } from './gameModel';
import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';
import { modelState } from './modelState';

export const AppEvent = {
    PathChange: 'path_change',
};
/** 全局数据 */
export class AppModel extends ComponentManager {
    public game: GameModel;
    constructor() {
        super();
        modelState.app = this;
        this.addCom(new EventCom());
    }
    public enterGame() {
        const game = new GameModel();
        this.game = game;
        return game;
    }
    public leaveGame() {
        this.game = undefined;
    }
}

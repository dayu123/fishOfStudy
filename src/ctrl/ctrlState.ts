import { AppCtrl } from './appCtrl';
import { GameCtrl } from './game/gameCtrl';

type CtrlState = {
    app: AppCtrl;
    game: GameCtrl;
};

export const ctrlState = {} as CtrlState;

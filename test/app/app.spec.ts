import { GameCtrl } from 'ctrl/game/gameCtrl';
import { Test } from 'testBuilder';
import { injectProto } from 'honor/utils/tool';
import { AppCtrl } from 'ctrl/appCtrl';

export const app_test = new Test('app', runner => {
    injectProto(AppCtrl, 'startApp', () => {
        app_test.runTest('enter_game');
    });

    runner.describe('enter_game', () => {
        GameCtrl.preEnter();
    });
});

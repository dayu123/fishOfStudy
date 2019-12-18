import honor from 'honor';
import { mapTest, Test } from 'testBuilder';
import { TestBuilderCtor } from 'testBuilder/testBuilder';
import { getTestEnable, getTestIgnore, stageClick } from './utils/testUtils';
import { game_test } from './app/game/game.spec';
import { app_test } from './app/app.spec';
import { fish_test } from './app/game/fish.spec';
import { player_test } from './app/game/player.spec';
import { body_test } from './app/game/body.spec';
import { count_test } from './count.spec';
import { modelState } from 'model/modelState';
import { ctrlState } from 'ctrl/ctrlState';
import { skill_test } from './app/game/skill.spec';
import { viewState } from 'view/viewState';
import { injectAfter } from 'honor/utils/tool';
import { GameCtrl } from 'ctrl/game/gameCtrl';
import { socket_test } from './app/socket.spec';
import { sat_test } from './sat.spec';
import { ani_wrap } from './app/game/aniWrap.spec';
import { path_test } from './app/path.spec';
declare global {
    interface Window {
        test: typeof test;
        Honor: typeof honor;
        modelState: typeof modelState;
        ctrlState: typeof ctrlState;
        viewState: typeof viewState;
        stageClick: typeof stageClick;
    }
}

const testScope = new Test('top');
testScope.addChild(
    game_test,
    app_test,
    fish_test,
    player_test,
    body_test,
    count_test,
    skill_test,
    socket_test,
    sat_test,
    ani_wrap,
    path_test,
);
const testBuilder = new TestBuilderCtor(testScope, { is_on: true });
testBuilder.enableDisableTest(getTestEnable(), getTestIgnore());
testBuilder.init();

export const test = mapTest(testBuilder.top_scope);
window.test = test;
window.stageClick = stageClick;
window.modelState = modelState;
window.ctrlState = ctrlState;
window.viewState = viewState;
window.Honor = honor;

let running = false;
injectAfter(GameCtrl, 'preEnter', () => {
    if (running) {
        return;
    }
    running = true;
    player_test.runTest('add_cur_player');
    // fish_test.runTest('add_fish_group', ['21', '1']);
    fish_test.runTest('add_fish_group', ['20', '1']);
    // socket_test.runTest('connect');
    // path_test.runTest('sprite_offset');
});
socket_test.runTest('init_app_socket');

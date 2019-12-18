import { modelState } from 'model/modelState';
import { Test } from 'testBuilder';
import { fish_test } from './fish.spec';
import { player_id, player_test } from './player.spec';
import { viewState } from 'view/viewState';
import SkillItem from 'view/scenes/game/skillItemView';
import { startCount } from 'utils/count';

/** 技能的测试 */
export const skill_test = new Test('skill', runner => {
    runner.describe('auto_launch', () => {
        player_test.runTest('add_player');
        const player = modelState.app.game.getPlayerById(player_id);
        player.gun.autoLaunch.active();

        setTimeout(() => {
            player.gun.autoLaunch.clear();
        }, 5000);
    });

    runner.describe('track_fish', () => {
        fish_test.runTest('add_fish');
        player_test.runTest('add_player');
        const player = modelState.app.game.getPlayerById(player_id);
        /** 提示锁定不攻击 */
        setTimeout(() => {
            const fish = [...modelState.app.game.fish_list][0];
            player.gun.trackFish.track(fish, false);
        }, 1000);

        /** 锁定+攻击 */
        setTimeout(() => {
            const fish = [...modelState.app.game.fish_list][0];
            player.gun.trackFish.track(fish, true);
        }, 3000);

        /** 取消锁定 */
        setTimeout(() => {
            const fish = [...modelState.app.game.fish_list][0];
            player.gun.trackFish.unTrack();
        }, 7000);
    });

    runner.describe('speed_up', () => {
        fish_test.runTest('add_fish');
        player_test.runTest('add_player');
        const player = modelState.app.game.getPlayerById(player_id);
        setTimeout(() => {
            const fish = [...modelState.app.game.fish_list][0];
            player.gun.trackFish.track(fish, false);

            player.gun.toggleSpeedUp(true);
        }, 1000);

        setTimeout(() => {
            player.gun.toggleSpeedUp(false);
        }, 5000);

        setTimeout(() => {
            player.gun.trackFish.unTrack();
        }, 10000);
    });

    runner.describe('freezing', () => {
        fish_test.runTest('add_fish');

        setTimeout(() => {
            const { id } = [...modelState.app.game.fish_list][0];
            modelState.app.game.freezing_com.freezing(5, [id]);
        }, 5000);
    });

    runner.describe('ui_set_num', () => {
        const skill_item = viewState.game.skill_box.skill_list.getChildAt(
            0,
        ) as SkillItem;
        skill_item.setId('2');
        skill_item.setNum(2);
        startCount(10, 0.1, (t: number) => {
            skill_item.showCoolTime(1 - t);
        });
    });
    runner.describe('ui_set_num2', () => {
        const skill_item = viewState.game.skill_box.skill_list.getChildAt(
            0,
        ) as SkillItem;
        skill_item.showCoolTime(0.5);
        setTimeout(() => {
            skill_item.showCoolTime(1);
        }, 1000);
    });
    runner.describe('energy', () => {
        const game_view = viewState.game;
        startCount(10, 0.1, (t: number) => {
            game_view.setEnergyRadio(1 - t);
            if (1 - t === 1) {
                game_view.energyLight().then(() => {
                    skill_test.runTest('energy');
                });
            }
        });
    });
});

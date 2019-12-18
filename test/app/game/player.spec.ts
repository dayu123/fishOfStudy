import { modelState } from 'model/modelState';
import { PlayerInfo } from 'model/playerModel';
import { Test } from 'testBuilder';

export const player_id = 'xxxx';
/** @type {PlayerModel} 的测试 */
export const player_test = new Test('player', runner => {
    runner.describe('add_cur_player', () => {
        const player = modelState.app.game.getPlayerById(player_id);
        if (player) {
            return;
        }
        // body_test.runTest('show_shape');
        const player_data = {
            user_id: player_id,
            server_index: 0,
            level: 101,
            gold: 10000,
            gun_skin: '1',
            nickname: 'test',
            avatar: 'test',
            is_cur_player: true,
            skills: {
                '1': {
                    item_id: '1',
                    num: 20,
                    cool_time: 10,
                    used_time: 0,
                },
                '2': {
                    item_id: '2',
                    num: 20,
                    cool_time: 10,
                    used_time: 0,
                },
                '3': {
                    item_id: '3',
                    num: 20,
                    cool_time: 10,
                    used_time: 0,
                },
                '4': {
                    item_id: '4',
                    num: 20,
                    cool_time: 10,
                    used_time: 0,
                },
            },
        } as PlayerInfo;
        modelState.app.game.addPlayer(player_data);
    });

    runner.describe('add_other_player', () => {
        const other_id = '----';
        let other_player = modelState.app.game.getPlayerById(other_id);
        if (!other_player) {
            // body_test.runTest('show_shape');
            const player_data = {
                user_id: other_id,
                server_index: 0,
                level: 101,
                gold: 10000,
                gun_skin: '1',
                nickname: 'test',
                avatar: 'test',
                is_cur_player: true,
                skills: {
                    '1': {
                        item_id: '1',
                        num: 20,
                        cool_time: 10,
                        used_time: 0,
                    },
                    '2': {
                        item_id: '1',
                        num: 20,
                        cool_time: 10,
                        used_time: 0,
                    },
                    '3': {
                        item_id: '1',
                        num: 20,
                        cool_time: 10,
                        used_time: 0,
                    },
                },
            } as PlayerInfo;
            other_player = modelState.app.game.addPlayer(player_data);
        }
    });
});

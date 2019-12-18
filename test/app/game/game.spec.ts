import { modelState } from 'model/modelState';
import { Test } from 'testBuilder';

export const game_test = new Test('game', runner => {
    runner.describe('add_fish', () => {
        for (let i = 0; i < 10; i++) {
            const fish_data = {
                fishId: '00' + i,
                typeId: `${i + 1}`,
                displaceType: 'path',
                pathNo: `${i + 1}`,
                totalTime: 10,
                usedTime: 0,
            } as ServerFishInfo;
            modelState.app.game.addFish(fish_data);
        }
    });
});

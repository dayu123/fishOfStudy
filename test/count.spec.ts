import { Test } from 'testBuilder';
import { startCount, clearCount } from 'utils/count';

export const count_test = new Test('count', runner => {
    runner.describe('count', () => {
        const count = startCount(10 * 1000, (10 * 1000) / 12, t => {
            if (t === 0) {
                return console.log('complete');
            }
            console.log(t, Math.floor(11 * t));
        });

        setTimeout(() => {
            console.log(`test:`, count);
            clearCount(count);
        }, 3000);
    });
});

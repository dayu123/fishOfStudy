import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';
import { TimeoutCom } from 'comMan/timeoutCom';
import { FishStatus } from 'model/fishModel';
import { GameModel } from 'model/gameModel';

export const FreezingComEvent = {
    /** 冰冻 */
    Freezing: 'freezing',
    /** 解除冰冻 */
    UnFreezing: 'un_freezing',
};

/** 冰冻处理逻辑 */
export class FreezingCom extends ComponentManager {
    private game: GameModel;
    private freezing_timeout: number;
    constructor(game: GameModel) {
        super();
        this.game = game;

        this.addCom(new EventCom(), new TimeoutCom());
    }

    public get event() {
        return this.getCom(EventCom);
    }

    /** 冰冻 */
    public freezing(cool_time: number, fish_list: string[]) {
        const { game, freezing_timeout } = this;
        const timeout = this.getCom(TimeoutCom);
        if (freezing_timeout) {
            timeout.clear(freezing_timeout);
        }
        this.freezing_timeout = timeout.createTimeout(() => {
            this.unFreezing();
        }, cool_time * 1000);

        for (const fish_id of fish_list) {
            const fish = game.getFishById(fish_id);
            fish.setStatus(FishStatus.Freezed);
        }
        this.event.emit(FreezingComEvent.Freezing);
    }
    /** 解除冰冻 */
    public unFreezing() {
        const { game, freezing_timeout } = this;
        const { fish_list } = game;
        const timeout = this.getCom(TimeoutCom);
        if (freezing_timeout) {
            timeout.clear(freezing_timeout);
        }
        for (const fish of fish_list) {
            fish.setStatus(FishStatus.Normal);
        }
        this.event.emit(FreezingComEvent.UnFreezing);
    }
}

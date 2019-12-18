import * as SAT from 'sat';
import { FishModel, FishEvent, FishMoveData } from 'model/fishModel';
import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';
import { GunModel, GunEvent, GunStatus } from 'model/gun/gunModel';
import { ModelEvent } from 'model/modelEvent';

/** 追踪鱼com */
export class TrackFishCom extends ComponentManager {
    /** 追踪的鱼 */
    public fish: FishModel;
    private gun: GunModel;
    constructor(gun: GunModel) {
        super();
        this.gun = gun;
    }
    public get event() {
        let event_com = this.getCom(EventCom);
        if (!event_com) {
            event_com = new EventCom();
            this.addCom(event_com);
        }
        return event_com;
    }
    /**
     * 追踪的鱼
     * @param fish 追踪的鱼
     * @param fire 是否开火, 不开火时只提示用户选中鱼
     */
    public track(fish: FishModel, fire: boolean) {
        const { gun } = this;
        const { event } = gun;

        this.unTrack();

        if (fire) {
            this.fish = fish;
            gun.track_fish = fish;
            this.onTrack();
            fish.event.on(FishEvent.Move, this.onTrack, this);
            fish.event.on(ModelEvent.Destroy, this.unTrack, this);
            gun.setStatus(GunStatus.TrackFish);
            gun.preAddBullet(gun.direction, true);

            event.on(
                GunEvent.SwitchOn,
                () => {
                    gun.preAddBullet(gun.direction, true);
                },
                this,
            );
        }

        gun.event.emit(GunEvent.StartTrack, fish, fire);
    }
    private onTrack = () => {
        const { gun, fish } = this;
        const { x, y } = fish.pos;
        const { x: gx, y: gy } = gun.pos;
        gun.setDirection(new SAT.Vector(x - gx, y - gy));
    }; // tslint:disable-line: semicolon
    public unTrack() {
        const { fish, gun } = this;
        if (!fish) {
            return;
        }
        gun.event.emit(GunEvent.StopTrack);
        gun.setStatus(GunStatus.Normal);
        gun.track_fish = undefined;
        gun.event.offAllCaller(this);
        fish.event.offAllCaller(this);
        this.fish = null;
    }
    public destroy() {
        const { gun } = this;
        this.unTrack();
        gun.delCom(this);
        this.gun = undefined;
    }
}

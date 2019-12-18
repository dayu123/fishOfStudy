import { ComponentManager } from 'comMan/component';
import { BulletModel, BulletInfo } from './bulletModel';
import { GunModel } from './gunModel';
import { TrackTarget } from 'model/com/moveCom/moveTrackCom';
import { FishModel } from 'model/fishModel';

export type BulletGroupInfo = {
    bullets_pos: Point[];
    velocity: SAT.Vector;
    track?: TrackTarget;
};

/** 子弹组合(一次发射多个子弹, 一颗子弹击中鱼, 所有同时生成网) */
export class BulletGroup extends ComponentManager {
    public bullet_list: Set<BulletModel> = new Set();
    private gun: GunModel;
    /** 是否已经捕捉到了, 只处理第一个bulletModel捕的鱼 */
    private casted = false;
    constructor(info: BulletGroupInfo, gun: GunModel) {
        super();
        this.gun = gun;
        this.initBullet(info);
    }
    private initBullet(info: BulletGroupInfo) {
        const { bullets_pos, track, velocity } = info;
        const { skin, level, level_skin } = this.gun;

        for (const pos of bullets_pos) {
            const bullet_props = {
                skin,
                pos,
                level,
                track,
                level_skin,
                velocity: velocity.clone(),
                cast_fn: this.castFn,
            } as BulletInfo;
            const bullet = new BulletModel(bullet_props);
            this.bullet_list.add(bullet);
        }
    }
    /** 一颗子弹击中鱼之后的处理 */
    private castFn = (fish: FishModel) => {
        const { gun, casted, bullet_list } = this;
        const { is_cur_player } = gun.player;
        if (casted) {
            return;
        }
        this.casted = true;
        if (is_cur_player) {
            gun.castFish(fish);
        }
        gun.removeBullet(this);
        this.gun = undefined;
        for (const bullet of bullet_list) {
            bullet.addNet(is_cur_player);
        }
        bullet_list.clear();
    }; //tslint:disable-line
}

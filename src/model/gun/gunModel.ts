import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';
import { TimeoutCom } from 'comMan/timeoutCom';
import { config } from 'data/config';
import * as SAT from 'sat';
import { getBulletStartPos, getGunLevelSkinInfo } from 'utils/dataUtil';
import { AutoLaunchCom } from '../com/autoLaunchCom';
import { TrackFishCom } from '../com/trackFishCom';
import { FishModel } from '../fishModel';
import { PlayerModel } from '../playerModel';
import { BulletGroup, BulletGroupInfo } from './bulletGroup';

export const GunEvent = {
    /** 添加子弹 */
    AddBullet: 'add_bullet',
    /** 方向改变 */
    DirectionChange: 'direction_change',
    /** 开关 */
    SwitchOn: 'switch_on',
    /** 加速状态 */
    SpeedUpStatus: 'speed_up_status',
    /** 网道鱼 */
    CastFish: 'cast_fish',
    /** 开始追踪 */
    StartTrack: 'start_track',
    /** 停止追踪 */
    StopTrack: 'stop_track',
    /** 等级修改 */
    LevelChange: 'level_change',
};

export type LevelInfo = {
    level: number;
    skin: string;
    level_skin: string;
    hole_num: number;
};
export enum GunStatus {
    Normal,
    AutoLaunch,
    TrackFish,
}
/** 炮台数据类 */
export class GunModel extends ComponentManager {
    /** 炮口的方向 */
    public direction = new SAT.Vector(0, -1);
    /** 位置 */
    public readonly pos: Point;
    /** 炮等级 */
    public level: number;
    /** 炮皮肤 */
    public readonly skin: string;
    /** 炮皮肤 */
    public level_skin: string;
    /** 炮皮肤 */
    public hole_num: number;
    /** 子弹列表 */
    private bullet_list: Set<BulletGroup> = new Set();
    /** 所属的玩家 */
    public player: PlayerModel;
    /** 追踪的鱼 */
    public track_fish: FishModel;
    /** 炮台的状态 */
    public status = GunStatus.Normal;
    /** 是否加速  */
    public is_speedup = false;
    /** 是否加速  */
    public launch_space = config.launch_space;
    /** 枪是否打开, 用来控制发射子弹的间隔 */
    private is_on = true;
    /** 枪是狂暴 */
    public rage = false;
    constructor(pos: Point, skin: string, player: PlayerModel) {
        super();

        this.pos = pos;
        this.skin = skin;
        this.player = player;
        this.init();
    }
    private init() {
        this.addCom(new EventCom(), new TimeoutCom());
        this.initDirection();
        this.setLevel(this.player.level);
    }
    public get event() {
        return this.getCom(EventCom);
    }
    private initDirection() {
        const { server_index } = this.player;
        if (server_index < 2) {
            /** 炮台在下面, 方向为向上 */
            this.setDirection(new SAT.Vector(0, -1));
        } else {
            this.setDirection(new SAT.Vector(0, 1));
            /** 炮台在下面, 方向为向下 */
        }
    }
    public setDirection(direction: SAT.Vector) {
        if (direction === this.direction) {
            return;
        }
        this.direction = direction;
        this.event.emit(GunEvent.DirectionChange, direction);
    }
    public setLevel(level: number) {
        if (level === this.level) {
            return;
        }
        const { skin } = this;
        const { level_skin, hole_num } = getGunLevelSkinInfo(level);
        this.level = level;
        this.level_skin = level_skin;
        this.hole_num = hole_num;

        const timeout = this.getCom(TimeoutCom);
        timeout.createTimeout(() => {
            this.event.emit(GunEvent.LevelChange, {
                level,
                skin,
                level_skin,
                hole_num,
            } as LevelInfo);
        }, this.launch_space);
    }
    public setStatus(status: GunStatus) {
        if (status === this.status) {
            return;
        }
        this.status = status;
    }
    public toggleSpeedUp(is_speedup: boolean) {
        if (is_speedup === this.is_speedup) {
            return;
        }
        this.is_speedup = is_speedup;
        this.event.emit(GunEvent.SpeedUpStatus, is_speedup);
        if (is_speedup === true) {
            /** 开启 */
            this.launch_space = config.launch_space / 2;
        } else {
            /** 禁用 */
            this.launch_space = config.launch_space;
        }
    }
    /** 自动发射的处理 */
    public get autoLaunch() {
        let auto_launch = this.getCom(AutoLaunchCom);
        if (!auto_launch) {
            auto_launch = new AutoLaunchCom(this);
            this.addCom(auto_launch);
        }
        return auto_launch;
    }
    public get trackFish() {
        let track_fish = this.getCom(TrackFishCom);
        if (!track_fish) {
            track_fish = new TrackFishCom(this);
            this.addCom(track_fish);
        }
        return track_fish;
    }
    public get speedup() {
        let track_fish = this.getCom(TrackFishCom);
        if (!track_fish) {
            track_fish = new TrackFishCom(this);
            this.addCom(track_fish);
        }
        return track_fish;
    }
    public preAddBullet(velocity: SAT.Vector, force = false) {
        if (!force && this.status === GunStatus.TrackFish) {
            return;
        }
        velocity = velocity.clone().normalize();
        this.setDirection(velocity);

        if (!force && this.status === GunStatus.AutoLaunch) {
            return;
        }

        if (!this.is_on) {
            return;
        }

        this.addBullet(velocity);

        /** 枪隔一段时间才会打开 */
        this.is_on = false;
        const timeout = this.getCom(TimeoutCom);
        timeout.createTimeout(() => {
            this.is_on = true;
            this.event.emit(GunEvent.SwitchOn);
        }, this.launch_space);
    }
    public addBullet(velocity: SAT.Vector) {
        const { skin, level_skin } = this;

        velocity = velocity.clone().normalize();
        this.setDirection(velocity);
        const bullets_pos = getBulletStartPos(
            this.player.server_index,
            velocity.clone(),
            `${skin}${level_skin}`,
        );
        const info: BulletGroupInfo = {
            bullets_pos,
            velocity,
            track: this.track_fish,
        };
        const bullet_group = new BulletGroup(info, this);
        this.bullet_list.add(bullet_group);
        this.event.emit(GunEvent.AddBullet, bullet_group, velocity);
    }
    public castFish(fish: FishModel) {
        this.event.emit(GunEvent.CastFish, fish);
    }
    public removeBullet(bullet: BulletGroup) {
        this.bullet_list.delete(bullet);
    }
    public destroy() {
        super.destroy();
    }
}

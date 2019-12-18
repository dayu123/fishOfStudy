import { ComponentManager } from 'comMan/component';
import { getGunInfo } from 'utils/dataUtil';
import { GunModel } from './gun/gunModel';
import { SkillMap, SkillModel } from './skill/skillModel';
import { SkillInfo } from './skill/skillCoreCom';
import { setProps } from 'utils/utils';

type SkillMap = {
    [key: string]: SkillInfo;
};
export type PlayerInfo = {
    user_id: string;
    server_index: number;
    level: number;
    gold: number;
    gun_skin: string;
    nickname: string;
    avatar: string;
    is_cur_player: boolean;
    skills: SkillMap;
};

/** 玩家的数据类 */
export class PlayerModel extends ComponentManager {
    /** 用户id */
    public user_id: string;
    /** 是否是当前用户 */
    public is_cur_player: boolean;
    /** 服务器的位置 */
    public server_index: number;
    /** 等级 */
    public level: number;
    /** 金币数量 */
    public gold: number;
    /** 用户名 */
    public nickname: string;
    /** 图像地址 */
    public avatar: string;
    /** 炮台 */
    public gun: GunModel;
    /** 技能列表 */
    public skill_map: Map<string, SkillModel> = new Map();
    constructor(player_info: PlayerInfo) {
        super();
        this.init(player_info);
    }
    private init(player_info: PlayerInfo) {
        const {
            user_id,
            server_index,
            level,
            gun_skin,
            nickname,
            avatar,
            gold,
            is_cur_player,
            skills,
        } = player_info;

        setProps(this as PlayerModel, {
            user_id,
            server_index,
            level,
            nickname,
            avatar,
            gold,
            is_cur_player,
        });

        const { pos } = getGunInfo(server_index);
        const gun = new GunModel(pos, gun_skin, this);
        this.gun = gun;

        this.initSkill(skills);
    }
    private initSkill(skills: SkillMap) {
        const { skill_map } = this;
        for (const key in SkillMap) {
            if (!SkillMap.hasOwnProperty(key)) {
                continue;
            }
            const ctor = SkillMap[key];
            const info = {
                player: this,
                ...skills[key],
            };
            skill_map.set(key, new ctor(info));
        }
    }
}

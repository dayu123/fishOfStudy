/** 资源所属场景 */
type BelongScene = 'room_normal' | 'room_poker';
/** 鱼网子弹的sprite
 * img 里面是图片的地址+pivot
 * shape 里面是形状+pivot
 */

export type SpriteInfo = {
    as?: string;
    /** 动画类型龙骨动画 帧动画 直接图片 */
    type?: 'DragonBone' | 'Frame' | 'Img';
    /** 图片的地址 */
    path?: string;
    /** 图片的中心点 */
    pivot?: Point;
    /** 宽 */
    width?: number;
    /** 高 */
    height?: number;
    belong_scene?: BelongScene;
};

export type GunSpriteInfo = {
    has_base?: boolean;
};
/** 鱼动画类型 正常 | 水平翻转 */
export type FishAniType = 'normal' | 'horizon_turn';
export type FishSpriteInfo = SpriteInfo & {
    /** 有没有转向动画 */
    ani_type?: FishAniType;
    group?: Array<{
        typeId: string;
        pos: Point;
    }>;
    /** 为了在边界给鱼添加额外的路径, 慢慢的进入|退出 */
    offset?: number[];
};
export interface GameSprite {
    /** 枪 */
    gun: {
        [key: string]: GunSpriteInfo;
    };
    /** 子弹 */
    bullet: {
        [key: string]: SpriteInfo;
    };
    /** 鱼icon */
    fish_icon: {
        [key: string]: SpriteInfo;
    };
    /** 网 */
    net: {
        [key: string]: SpriteInfo;
    };
    /** 鱼阴影 */
    fish_shadow: {
        [key: string]: SpriteInfo;
    };
    /** 鱼 */
    fish: {
        [key: string]: FishSpriteInfo;
    };
    /** 技能 */
    other: {
        [key: string]: SpriteInfo;
    };
}
/** 鱼网子弹的sprite
 * img 里面是图片的地址+pivot
 * shape 里面是形状+pivot
 */
export type SpriteType =
    | 'coin'
    | 'gun'
    | 'net'
    | 'bullet'
    | 'fish'
    | 'fish_shadow'
    | 'gun_fire'
    | 'skill'
    | 'other';

export let SPRITE: GameSprite = {
    gun: {
        '1': {
            has_base: true,
        },
        '2': {},
        '3': {},
    },
    bullet: {
        '1': {
            type: 'DragonBone',
            path: 'ani/gun/bullet1',
        },
        '2': {
            type: 'DragonBone',
            path: 'ani/gun/bullet2',
        },
        '3': {
            type: 'DragonBone',
            path: 'ani/gun/bullet3',
        },
    },
    net: {
        '1': {
            type: 'DragonBone',
            path: 'ani/gun/net1',
        },
        '2': { type: 'DragonBone', path: 'ani/gun/net2' },
        '3': { type: 'DragonBone', path: 'ani/gun/net3' },
    },
    fish_shadow: {
        '1': {
            type: 'Img',
            path: 'images/game/fish_shadow1',
        },
    },
    fish: {
        '1': {
            type: 'DragonBone',
            offset: [50, 41, 33, 43],
            path: 'ani/fish/fish1',
            ani_type: 'horizon_turn',
        },
        '2': {
            type: 'DragonBone',
            offset: [63, 50, 62, 50],
            path: 'ani/fish/fish2',
        },
        '3': {
            type: 'DragonBone',
            offset: [47, 67, 38, 58],
            path: 'ani/fish/fish3',
            ani_type: 'horizon_turn',
        },
        '4': {
            type: 'DragonBone',
            offset: [82, 90, 86, 91],
            path: 'ani/fish/fish4',
        },
        '5': {
            type: 'DragonBone',
            offset: [137, 43, 168, 43],
            path: 'ani/fish/fish5',
        },
        '6': {
            type: 'DragonBone',
            offset: [49, 47, 36, 44],
            path: 'ani/fish/fish6',
            ani_type: 'horizon_turn',
        },
        '7': {
            type: 'DragonBone',
            offset: [47, 56, 38, 55],
            path: 'ani/fish/fish7',
            ani_type: 'horizon_turn',
        },
        '8': {
            type: 'DragonBone',
            offset: [44, 79, 120, 80],
            path: 'ani/fish/fish8',
        },
        '9': {
            type: 'DragonBone',
            offset: [85, 93, 88, 86],
            path: 'ani/fish/fish9',
        },
        '10': {
            type: 'DragonBone',
            offset: [84, 91, 87, 88],
            path: 'ani/fish/fish10',
        },
        '11': {
            type: 'DragonBone',
            offset: [86, 72, 150, 68],
            path: 'ani/fish/fish11',
            ani_type: 'horizon_turn',
        },
        '12': {
            type: 'DragonBone',
            offset: [176, 74, 175, 75],
            path: 'ani/fish/fish12',
        },
        '13': {
            type: 'DragonBone',
            offset: [162, 103, 201, 102],
            path: 'ani/fish/fish13',
        },
        '14': {
            type: 'DragonBone',
            offset: [148, 99, 311, 99],
            path: 'ani/fish/fish14',
        },
        '15': {
            type: 'DragonBone',
            offset: [229, 157, 290, 156],
            path: 'ani/fish/fish15',
        },
        '16': {
            type: 'DragonBone',
            offset: [157, 130, 68, 131],
            path: 'ani/fish/fish16',
            ani_type: 'horizon_turn',
        },
        '17': {
            type: 'DragonBone',
            offset: [122, 92, 150, 92],
            path: 'ani/fish/fish17',
        },
        '18': {
            type: 'DragonBone',
            offset: [128, 106, 85, 123],
            path: 'ani/fish/fish18',
            ani_type: 'horizon_turn',
        },
        '19': {
            type: 'DragonBone',
            offset: [147, 140, 133, 156],
            path: 'ani/fish/fish19',
            ani_type: 'horizon_turn',
        },
        '20': {
            type: 'DragonBone',
            offset: [110, 183, 54, 138],
            path: 'ani/fish/fish20',
            ani_type: 'horizon_turn',
        },
        g21: {
            group: [
                {
                    typeId: '1',
                    pos: {
                        x: -135,
                        y: -46,
                    },
                },
                {
                    typeId: '1',
                    pos: {
                        x: -28,
                        y: -48,
                    },
                },
                {
                    typeId: '1',
                    pos: {
                        x: 23,
                        y: 47,
                    },
                },
            ],
            offset: [110, 183, 54, 138],
        },
    },
    fish_icon: {
        '1': {
            type: 'Img',
            path: 'images/game/normal/icon_fish1',
        },
        '2': {
            type: 'Img',
            path: 'images/game/normal/icon_fish2',
        },
    },
    other: {
        freezing: {
            type: 'DragonBone',
            path: 'ani/other/freezing',
        },
        exploding: {
            type: 'DragonBone',
            path: 'ani/other/exploding',
        },
        shoal_wave: {
            type: 'DragonBone',
            path: 'ani/other/shoal_wave',
        },
        pos_tip: {
            type: 'DragonBone',
            path: 'ani/other/pos_tip',
        },
        aim: {
            type: 'DragonBone',
            path: 'ani/other/aim',
        },
        energy_light: {
            type: 'DragonBone',
            path: 'ani/other/energy_light',
        },
        coin: {
            type: 'Frame',
            pivot: {
                x: 44 / 2,
                y: 46 / 2,
            },
            width: 44,
            height: 46,
        },
    },
};

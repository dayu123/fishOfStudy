import { SPRITE } from './sprite';

export const res = {
    font: [],
    game: [
        {
            url: `res/image/game.png`,
            type: Laya.Loader.IMAGE,
        },
        {
            url: `res/image/game.json`,
            type: Laya.Loader.JSON,
        },
        {
            url: `image/game/bg_normal.sk`,
            type: Laya.Loader.BUFFER,
        },
        {
            url: `image/game/bg_normal.png`,
            type: Laya.Loader.IMAGE,
        },
    ],
};
for (const top_type in SPRITE) {
    if (!SPRITE.hasOwnProperty(top_type)) {
        continue;
    }
    const item_map = SPRITE[top_type];
    for (const sub_type in item_map) {
        if (!item_map.hasOwnProperty(sub_type)) {
            continue;
        }
        const item = item_map[sub_type];
        if (item.type === 'DragonBone') {
            const path = item.path;
            res.game.push(
                {
                    url: `${path}.sk`,
                    type: Laya.Loader.BUFFER,
                },
                {
                    url: `${path}.png`,
                    type: Laya.Loader.IMAGE,
                },
            );
        }
    }
}

/** gun */
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        res.game.push(
            {
                url: `ani/gun/light${i}${j}.sk`,
                type: Laya.Loader.BUFFER,
            },
            {
                url: `ani/gun/light${i}${j}.png`,
                type: Laya.Loader.IMAGE,
            },
            {
                url: `ani/gun/gun${i}${j}.sk`,
                type: Laya.Loader.BUFFER,
            },
            {
                url: `ani/gun/gun${i}${j}.png`,
                type: Laya.Loader.IMAGE,
            },
        );
        if (SPRITE.gun[i].has_base) {
            res.game.push(
                {
                    url: `ani/gun/base${i}${j}.sk`,
                    type: Laya.Loader.BUFFER,
                },
                {
                    url: `ani/gun/base${i}${j}.png`,
                    type: Laya.Loader.IMAGE,
                },
            );
        }
    }
    res.game.push(
        {
            url: `ani/gun/bullet${i}.sk`,
            type: Laya.Loader.BUFFER,
        },
        {
            url: `ani/gun/bullet${i}.png`,
            type: Laya.Loader.IMAGE,
        },
    );

    // res.game.push(
    //     {
    //         url: `ani/gun/bullet${i}_rage.sk`,
    //         type: Laya.Loader.BUFFER,
    //     },
    //     {
    //         url: `ani/gun/bullet${i}_rage.png`,
    //         type: Laya.Loader.IMAGE,
    //     },
    // );
}

export const font_list = ['font/score_num'];
for (const font of font_list) {
    res.font.push(
        {
            url: `${font}.fnt`,
            type: Laya.Loader.XML,
        },
        {
            url: `${font}.png`,
            type: Laya.Loader.IMAGE,
        },
    );
}

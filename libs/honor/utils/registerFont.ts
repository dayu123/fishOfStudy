export function registerFontSize(url_list: string[]) {
    for (const url of url_list) {
        const bitmapFont = new Laya.BitmapFont();
        const path_split = url.split('/');
        const name = path_split[path_split.length - 1];
        const font_url = `${url}.fnt`;
        const png_url = `${url}.png`;

        bitmapFont.parseFont(
            Laya.loader.getRes(font_url),
            Laya.loader.getRes(png_url),
        );
        Laya.Text.registerBitmapFont(name, bitmapFont);
    }
}

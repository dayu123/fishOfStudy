coingame.sys.init({
    callback: () => {
        // 检查登录态
        const logged = coingame.account.checkLogged();

        // 加载游戏引擎
        if (logged) {
            loadEngin();
        }
    },
});
// @test
loadEngin();

function loadEngin() {
    /**
     * 设置LayaNative屏幕方向，可设置以下值
     * landscape           横屏
     * portrait            竖屏
     * sensor_landscape    横屏(双方向)
     * sensor_portrait     竖屏(双方向)
     */
    window.screenOrientation = 'sensor_landscape';

    //-----libs-begin-----
    loadLib('libs/laya.core.js');
    loadLib('libs/laya.ani.js');
    loadLib('libs/laya.html.js');
    loadLib('libs/laya.ui.js');
    loadLib('libs/bytebuffer.js');
    //-----libs-end-------
    loadLib('js/bundle.js?v=' + CDN_VERSION);
}

declare global {
    interface Window {
        CDN_VERSION: string;
    }
}

export const config = {
    cdn_version: window.CDN_VERSION,
    bullet_speed: 15,
    pool_width: 1920,
    pool_height: 750,
    /** 自动攻击的间隔 ms */
    launch_space: 100,
};

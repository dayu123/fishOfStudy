HonorLite Laya 2.0 项目精简示例

## 标签

Laya2.0 Honor Webpack

## 说明

### [honor](http://172.21.1.184/jk_html/honor.git)

前端 view 层框架

#### 常用接口

[运行游戏](./src/main.ts#L21)

```ts
/** 运行游戏
  * @param GameConfig 是Laya自动生成的游戏配置 src/GameConfig
  * @param callback 游戏运行完成之后执行函数
  */
Honor.run(GameConfig: any, callback: any): void;
```

[设置场景切换的 loading 页面](./src/main.ts#7)

```ts
/** 设置场景切换的loading页面
   * @param url loading页面的url
   * @param callback 完成的callback
   */
Honor.director.setLoadPageForScene(url: any, callback: any): void;

/** LoadScene 需要 实现的接口 */
export interface HonorLoadScene {
    /** 关闭调用 */
    onReset(): void;
    /** 打开调用 */
    onShow(): void;
    /** 设置进度 */
    onProgress(val: number): void;
}
```

[运行场景](src\view\scenes\login.ts#L7)

```ts
/**
    * 运行场景
    * @param url 场景的url
    * @param params 场景 onMounted 接收的参数
   */
Honor.director.runScene(url: any, ...param: any[]): void;

/** 场景需要 implements HonorLoadScene */
export interface HonorScene extends Laya.Scene {
    onMounted(...param: any[]): void;
}
```

[打开弹出层](src\view\scenes\login.ts#21)

```ts
/**
    * 运行场景
    * @param url 场景的url
    * @param params 场景 onMounted 接收的参数
    * @param config dialog的配置
    * @param use_exist 是否使用已经创建好的实例(使用设置为true, 就会忽略config的配置)
   */
Honor.director.openDialog(url: any, params: any[], config?: HonorDialogConfig, use_exist = false): void;

/** dialog 需要实现的接口 */
export interface HonorDialog extends Laya.Dialog {
    config?: HonorDialogConfig;
    /** 弹出层打开之前调用... */
    onMounted?(...params: any[]): void;
    onResize?(width?: number, height?: number): void;
}

/** 弹出层 的配置 */
export type HonorDialogConfig = {
    /** 在弹窗模式为multiple时，是否在弹窗弹窗的时候关闭其他显示中的弹窗 */
    closeOther?: boolean;
    /** 模式窗口点击遮罩，是否关闭窗口，默认是关闭的 */
    closeOnSide?: boolean;
    /** 在弹窗模式为multiple时，是否在弹窗弹窗的时候关闭相同group属性的弹窗 */
    closeByGroup?: boolean;
    /** 在弹窗模式为multiple时，是否在弹窗弹窗的时候关闭相同name属性的弹窗 */
    closeByName?: boolean;
    /** 指定对话框是否居中弹。 如果值为true，则居中弹出，否则，则根据对象坐标显示，默认为true。 */
    shadowAlpha?: number;
    /** 弹出框背景透明度 */
    shadowColor?: string;
    /** 指定时间内自动关闭，单位为ms，默认不打开此功能 */
    autoClose?: boolean | number;
};

```

[Director 其他方法](http://172.21.1.184/jk_html/honor/blob/master/src/UI/Director.ts)

[场景切换监控](http://172.21.1.184/jk_html/honor/blob/master/src/Utils/sceneChangeMonitor.ts)

[是否是测试]

```ts
Honor.DEBUG_MODE;
```

### 工具

在 script 目录下有常用 js 工具文件, 注意项目中的文件夹中的 config.demo.json(不要删除这个文件), 将他们复制一份重命名为 config.json(git 会 ignore 这个文件), 然后修改里面的配置

[生成版本号]
会在 bin 目录下生成一个 version.json 包含当前项目所有文件的版本号

```bash
npm run genVersion
```

config.json 的自定义匹配值

```json
  // json中只需要修改此项, 本地前端项目的根目录
 "project_folder": "本地项目地址",
```

[压缩图片]
会 gamehall 中游戏文件夹中的图片使用 pnggo

```bash
npm run compressImg
```

config.json 的自定义匹配值

```json
  // json中只需要修改此项, gamehall中游戏
 "gamehall_path": "gamehall中游戏目录的地址"
```

## ts 或 js

项目默认使用 ts, layaIde 项目设置为 ts, 如果你想使用 js, 只要将项目中文件(非 Laya 自动生成)后缀改成 js 就可以了

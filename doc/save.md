-   @ques@imp js createTimeout 返回的 index 会不会重复
-   @ques model com 能不能缓存 这样可以减小很多的消耗

-   @todo 鱼死亡 自动瞄准

-   @todo 其他玩家网不进行碰撞检测如何处理

-   @ques 碰撞检测, 所有的 body_com 放在一个地方处理

-   @ques 所有的 shape|sprite 的位置匹配太麻烦了, 有没有更好的方式

*   @ques track 在鱼 fish destroy, 需要将子弹还原, 这怎么处理
    -   trackCom + recover...

-   @ques 将 createFish|bullet 放在 ctrl/state 中, 有更好的方式吗
-   @ques 网捕捉到鱼 我怎么知道是谁捉到的

-   @note moveVelocity 可以再优化 将碰墙去掉
-   @note `angle + Math.PI / 2;` 这种代码最好清理掉

-   @todo BackgroundMonitor 测试环境禁用

    -   提供接口禁用 也做成工具函数类型

-   @todo fish_view|net 要不要创建 class 控制(根据需要)

-   @todo 有没有必要将所有 ctrl 监听 model 事件做成异步 且放在一个函数中处理...

## 生成鱼群工具

## 链式引用

player -> gun -> bullet -> net
net 需要访问 player, 怎么处理?

一级一级的往下传递数据

或者建立一个由上往下的通道 tunnel
player -> gun(top:player) -> .. (top queryTop(name|class))
代价很大 必须有一个基类, 灵活易用

## 影响性能的地方

-   get event 在这个函数中每次去便利寻找 event
    -   可能这个影响也不大, 毕竟这只是找一次然后就去用...

## save

-   @bug 高阳的路径的背景的长宽
    -   1920 是否太大了(1625x750 是不是更好些...)

*   @todo 自己生成贝塞尔曲线 后面再去做...
    -   本地支持贝塞尔支持参数
    -   三个点控制的贝塞尔 [start, end, 垂直偏移, 正偏移]
    -   他怎么知道 曲线的样式
    -   我本地写一个函数... 试一试 能不能用...
    -   让产品来确定参数的阈值, 如果可以以后就不用前端来记录这些信息了
    -   有没有可能固定一条曲线 用正负偏差来生成新的路径

## api

http://gitlab.intranet.huiyin.com/springfans/game/game-bitfish-server/blob/docker/API.md

-   ts strict: true

-   @todo 将和样式相关的代码放到 view 层中

-   @todo 组件化 组件应该是不依赖任何东西

    -   将所有的能提纯的放在组件中
    -   将组织逻辑放在组合中

-   @todo mvc
    -   m+v 保持干净的逻辑不依赖, ctrl 层联系两部分...
    -   跨界依赖:> @ques gameCtrl -> appCtrl --> appModel --> gameModel

## structure

MoveComponent -> displace -> path | fun

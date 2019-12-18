## appModel.changePath

```ts
export const AppPath = {
    Game: 'game',
    Hall: 'hall',
};

public changePath(path: string) {
    if (path === this.path) {
        return;
    }
    this.path = path;
    this.getCom(EventCom).emit(AppEvent.PathChange);
}
```

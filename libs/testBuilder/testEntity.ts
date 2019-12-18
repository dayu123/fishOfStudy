import { TestEntity, TestFun, TestItem } from './interface';

export class TestEntityCtor implements TestEntity {
    public msg: string;
    public fun: TestFun;
    public children: TestEntityCtor[] = [];
    public itemList: TestItem[] = [];
    public afterAll: TestFun[] = [];
    public beforeAll: TestFun[] = [];
    public afterEach: TestFun[] = [];
    public beforeEach: TestFun[] = [];
    constructor(msg: string, fun: TestFun) {
        this.msg = msg;
        this.fun = fun;
    }
}

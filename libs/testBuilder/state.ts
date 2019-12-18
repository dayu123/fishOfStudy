import { TestEntity, TestFun, TestScopeFun, TestUtil } from './interface';
import { TestEntityCtor } from './testEntity';
import { asyncRunTestFun, asyncRunTestFunArr } from './utils';

export let entity_list: TestEntity[] = [];
export let test_util: TestUtil;
export let cur_test_entity: TestEntity;

export function initState() {
    test_util = {
        describe,
        it,
        afterAll,
        beforeAll,
        afterEach,
        beforeEach,
    };
}

/** 打开Test */
export function parseTest(run_fun: TestScopeFun) {
    entity_list = [];
    try {
        run_fun(test_util);
    } catch (e) {
        console.error(`TestBuilder:>`, e.stack ? e.stack : e);
    }
    return entity_list;
}

function describe(msg: string, fun: TestFun) {
    const entity = new TestEntityCtor(msg, fun);
    entity_list.push(entity);
}
function it(msg: string, fun: TestFun) {
    cur_test_entity.itemList.push({
        msg,
        fun,
    });
}
function afterAll(fun: TestFun) {
    cur_test_entity.afterAll.push(fun);
}
function beforeAll(fun: TestFun) {
    cur_test_entity.beforeAll.push(fun);
}
function afterEach(fun: TestFun) {
    cur_test_entity.afterEach.push(fun);
}
function beforeEach(fun: TestFun) {
    cur_test_entity.beforeEach.push(fun);
}

export async function parseTestEntity(entity: TestEntity, params: any[] = []) {
    const { fun } = entity;

    console.group(`TestBuilder:>`, entity.msg);
    cur_test_entity = entity;
    try {
        fun(...params);
    } catch (e) {
        console.error(`TestBuilder:>`, e.stack ? e.stack : e);
    }

    cur_test_entity = undefined;
    await runTestEntity(entity);
    console.groupEnd();
}
export async function runTestEntity(entity: TestEntity, params?: any[]) {
    // tslint:disable-next-line
    const { afterAll, afterEach, beforeAll, beforeEach, itemList } = entity;
    await asyncRunTestFunArr(beforeAll, 'concurrent');
    for (const item of itemList) {
        await asyncRunTestFunArr(beforeEach, 'concurrent');
        await asyncRunTestFun(item.fun)
            .then(() => {
                console.log(`TestBuilder:>`, 'success:>', item.msg, 'success');
            })
            .catch(err => {
                console.error(`TestBuilder:>`, 'fail:>', item.msg, 'fail');
            });
        await asyncRunTestFunArr(afterEach, 'concurrent');
    }
    await asyncRunTestFunArr(afterAll, 'concurrent');
}

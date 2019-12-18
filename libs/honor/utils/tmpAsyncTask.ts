/** 将异步任务推送到数组中,完成就删除掉 */
export function tmpAsyncTask<T extends Promise<any>>(
    temp_arr: T[],
    task: T,
): Promise<number> {
    return new Promise((resolve, reject) => {
        temp_arr.push(task);
        task.then(() => {
            const index = temp_arr.indexOf(task);
            if (index !== -1) {
                temp_arr.splice(index, 1);
            }
            resolve(temp_arr.length);
        });
    });
}

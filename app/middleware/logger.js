/**
 *  对中间件的进一步理解，以记录日志为例：
 */

// function log(store, action) {
//     console.log(action)
//     store.dispatch(action);
//     console.log('next state', store.getState());
// }
// log(store, action)
//
// // 扩展store.dispatch方法
// function log(store) {
//     let next = store.dispatch
//     store.dispatch = function (action) {
//         console.log(action)
//         let result = next(action) // 返回dispatch对象
//         console.log('next state', store.getState());
//         return result
//     }
// }
// log(store);
// store.dispatch(action);
//
// // 将扩展store.dispatch修改为返回方法
// function log(store) {
//     // 上一个中间件执行后的dispatch
//     let next = store.dispatch
//     return function (action) {
//         console.log(action)
//         let result = next(action)
//         console.log('next state', store.getState());
//         return result
//     }
// }
// log(store)(action);
//
// // 为了保证dispatch是上一个中间件执行后的dispatch
// function log(store) {
//     return function(next){
//         return function (action) {
//             console.log(action)
//             let result = next(action)
//             console.log('next state', store.getState());
//             return result;
//         }
//     }
// }
// log(store)(next)(action);

// 用lambda =>语法实现
export default store => next => action => {
    //console.log(action)
    const result = next(action)
   // console.log('next state', store.getState())
    return result
}

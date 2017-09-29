
import { createStore, applyMiddleware } from 'redux' // createStore方法创建数据存储store,applyMiddleware方法使用中间件
import thunkMiddleware from 'redux-thunk'// thunkMiddleware可以让store.dispatch 方法对象
import { logger, router, reduxRouterMiddleware } from '../middleware'
import rootReducer from '../reducers'

const nextReducer = require('../reducers')
/**
 * store,瞬时快照state
 * state会响应用户的操作而做出改变，只要state变化一定引起view变化，用户的操作会被包装成action对象，action就是view发出的通知，
 * action必须有type属性，是其的唯一标识。只有action能引起state变化，action会携带数据到store。
 * store.dispatch()是view发出action的唯一方式，发出action对象后，reducer对象会接收action，并使用携带的数据改变state。
 * 要想在store.dispatch(action)发出action后，自动执行reducer方法，就需要在创建store对象时，传入reducer方法。
 * reducer方法是纯函数，重要特征是只要输入相同，必定得到相同的输出。
 * store.subscribe(listener)注册监听器监听state变化，只要state变化，就会执行监听器处理逻辑来改变view，对于react来说监听逻辑就是
 * setState()或render();
 * 中间件：在store.dispatch(action)发出action前后做一些逻辑增强，在创建store的时候，用applyMiddlewares发放传入中间件，这样在发出action前
 * 后就会先调用中间件逻辑。
 */
export default function configure(initialState) {
    console.log('initialState', initialState)

    const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore
    // applyMiddleware函数 return createStore=>(reduce,initialState)=>{}
    const createStoreWithMiddleware = applyMiddleware(
        reduxRouterMiddleware,
        thunkMiddleware,
        logger,
        router
    )(create)
    // 创建数据存储store，如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State，用store.getState()得到当前的state
    // action会经过combineReducers中的每一个，如果type匹配就处理
    const store = createStoreWithMiddleware(rootReducer, initialState)

    // 处理react改变后热加载
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(nextReducer)
        })
    }
    return store
}

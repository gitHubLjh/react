import {
  routerReducer,
} from 'react-router-redux' // reducer syncHistoryWithStore存放在store中的history信息，key为location
import {
  combineReducers,
} from 'redux'

import tabListResult from './tabList'

import {
  houseCheckSearchResult,
  houseCheckSearchQuery,
  houseDetailResult,
} from './house'
import {
  loginResponse,
} from './common'

/**
 * react-router-redux中的核心方法：
 * routerReducer：处理与路由相关的action（type为routing），将action中的location存入store
 * syncHistoryWithStore(hashHistory, store)：同步history中的location update到store state中
 * routerMiddleware(history)：将dispatch发出的与路由相关action发送到history，引起组件路由
 * push、go、back....：产生与路由相关的action，如push(location)=>{type:routing,payload:location}
 */
const rootReducer = combineReducers({
    routing: routerReducer, // store location update from history，将location变更存放到store中
    config: (state = {}) => state,
    tabListResult,

    loginResponse,

    houseCheckSearchResult,
    houseCheckSearchQuery,
    houseDetailResult,
});

export default rootReducer;

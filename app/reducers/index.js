import {
  routerReducer,
} from 'react-router-redux' // reducer syncHistoryWithStore存放在store中的history信息，key为location
import {
  combineReducers,
} from 'redux'

import tabListResult from './tabList'

// house
import {
  houseCheckSearchResult,
  houseCheckSearchQuery,
  houseDetailResult,
} from './house'
import {
  loginResponse,
} from './common'

const rootReducer = combineReducers({ // reducer全都会放入store中
    routing: routerReducer,
    config: (state = {}) => state,
    tabListResult,

    loginResponse,

    houseCheckSearchResult,
    houseCheckSearchQuery,
    houseDetailResult,

});

export default rootReducer;

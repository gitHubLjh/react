import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router'
import {Provider} from 'react-redux'// 视图和store的中介，将视图操作转化为action，或者将state的变化反映给视图，视图通过其可以拿到state
import {syncHistoryWithStore} from 'react-router-redux' // 对传统history的增强，可以将history数据放入store中

import './config'
import configure from './store/configureStore'

import routes from './routes'

import hashHistory from './history'

const store = configure({config: global.$GLOBALCONFIG})
const historyWithStore = syncHistoryWithStore(hashHistory, store) // 将history信息放入store中

ReactDOM.render(
    // provider内的所有组件都可以拿到store中存储的state
    <Provider store={store}>
        <Router history={historyWithStore}>
            { routes }
        </Router>
    </Provider>,
    document.getElementById('root')
);

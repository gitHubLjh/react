import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Welcome from './pages/welcome'

const houseManage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./pages/house/houseManage').default)
    }, 'houseManage')
}

const houseDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./pages/house/houseDetail').default)
    }, 'houseDetail')
}

const houseEdit = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./pages/house/houseEdit').default)
    }, 'houseDetail')
}


const Login = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./containers/App/login').default)
    }, 'login')
}


const test = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./pages/test').default)
    }, 'test')
}

function isLogin(nextState, replaceState) {
    const token = sessionStorage.getItem('token')
    if (!token) {
        replaceState('/login')
    }
}
/**
 *react按需加载关键是让路由动态加载组件，getComponent与 component 属性一样，但是是异步的，当路由匹配时才会调用这个方法
 */
const routes = (
    <Route>
        <Route path="/" component={App} onEnter={isLogin}>
            <IndexRoute component={Welcome} />
            <Route path="/houseManage" getComponent={houseManage} />
            <Route path="/houseDetail" getComponent={houseDetail} />
            <Route path="/houseEdit" getComponent={houseEdit} />
            <Route path="/test" getComponent={test} query={{ }} />
        </Route>
        <Route path="/login" getComponent={Login} />
    </Route>
);

export default routes

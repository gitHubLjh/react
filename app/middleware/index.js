
import { routerMiddleware } from 'react-router-redux'
import logger from './logger'
import router from './router'
import history from '../history'

/**
 * routerMiddleware:
 */
const reduxRouterMiddleware = routerMiddleware(history) // 捕获action，并将action发送到history对象，history引起组件跳转

export {
    reduxRouterMiddleware,
    logger,
    router,
}

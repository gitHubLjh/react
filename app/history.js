import { useRouterHistory } from 'react-router' // useRouterHistory可以用来增强history，加入一些个性化
import createHashHistory from 'history/lib/createHashHistory' // 使用url中的hash部分去创建路由
/**
 * history用来管理js应用session会话历史，将不同环境的会话统一包装成一个库来管理页面跳转堆栈，及session间的持续状态。
 * history能够监听浏览器地址栏的变化，并将地址栏url转换为location对象，供router匹配相应的路由，从而正确的渲染对应的组件。
 * 可以通过操作history来改变视图，如go，back，forward等。
 * location对象：path,search,state,id,action等属性描述。
 * createHashHistory：default，路由使用url中的hash（#）部分切换。
 * createBrowserHistory：路由使用浏览器真实的url
 * createMemoryHistory：在内存中创建路由，不与url交互，适用于node服务器，RN环境。
 */
export default useRouterHistory(createHashHistory)({ queryKey: false })

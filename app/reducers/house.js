import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

const listResultState = {
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
    loading: true,
}
/**
 * handleActions其实是reducer
 */
export const houseCheckSearchResult = handleActions({
    // 发出请求前调用
    'request houseCheck list'(state, action) {
        return { ...state, loading: true }
    },
    // 收到响应后调用
    'receive houseCheck list'(state, action) {
        const { req, res } = action.payload // { req: data, res: res }
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, listResultState)

const queryResultState = () => ({
    keyword: { value: '' },
    division: { value: '' },
    institutions: { value: '' },
    houseStatus: { value: '' },
    addressType: { value: '' },
})

export const houseCheckSearchQuery = handleActions({
    'update houseCheck search query'(state, action) {
        return { ...state, ...action.payload }
    },
    'reset houseCheck search query'(state, action) {
        return { ...queryResultState() }
    },
}, queryResultState())


const detailResultState = {
}
export const houseDetailResult = handleActions({
    'request house detail'(state, action) {
        return { ...state, loading: true }
    },
    'receive house detail'(state, action) {
        const { res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, detailResultState)

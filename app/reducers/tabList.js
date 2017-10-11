import { handleActions } from 'redux-actions'//

const tabList = JSON.parse(sessionStorage.getItem('tabList'));

const initialState = {
    list: tabList ? tabList.list : [],
    activeKey: tabList ? tabList.activeKey : '',
}
/**
 * dispatch(action)时触发
 */
// handleActions返回对象
const tabListResult = handleActions({
    'request tab list'(state, action) {
        return { ...state, loading: false }
    },
    // 新增tab
    'update tab list': (state, action) => {
        const data = action.payload  // { title: e.item.props.name, content: '', key: e.key }
        const findList = state.list.find((tab) => tab.key === data.key);
        const list = findList === undefined ? [...state.list, data] : state.list; // ...es6展开运算符
        sessionStorage.setItem('tabList', JSON.stringify({ list, activeKey: data.key, loading: false }));
        return { list, activeKey: data.key, loading: false } // key省略的话，key名就是变量名
    },
    // 切换tab
    'update tab checked': (state, action) => {
        const activeKey = action.payload.activeKey;
        sessionStorage.setItem('tabList', JSON.stringify({ ...state, activeKey, loading: false }));
        console.log(activeKey+"====");
        return { ...state, activeKey, loading: false } // 对象展开语法
    },
    // 删除tab
    'delete tab from list': (state, action) => {
        const targetKey = action.payload.targetKey
        const list = []
        let delIndex = 0
        let activeKey
        state.list.map((tab, index) => {
            tab.key === targetKey ? delIndex = index : list.push(tab);
        });
        activeKey = state.activeKey;
        if (state.activeKey === targetKey) {
            activeKey = list[delIndex] ? list[delIndex].key : (list[delIndex - 1] ? list[delIndex - 1].key : '');
        }
        sessionStorage.setItem('tabList', JSON.stringify({ list, activeKey, loading: false }));
        return { list, activeKey, loading: false }
    },
}, initialState) // initialState是默认的state

export { tabListResult as default }

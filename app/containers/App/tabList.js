import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routerActions, push } from 'react-router-redux' // 连接route、history和store
import { is } from 'immutable';
import { Tabs } from 'antd'
// import { updateTabChecked, deleteTabFromList } from '../../actions/tabList'
import * as TabActionCreators from '../../actions/tabList'

const TabPane = Tabs.TabPane
/**
 * bindActionCreators 对所有的actionCreator进行包装，由于传入了dispatch函数，所以包装后的actionCreator直接dispatch了产生的action，如下
 * function actionCreator(payload){
        return{
            type:type,
            payload:payload
        }
    }
    经过bindActionCreators包装后的actionCreator如下：
    function actionCreator(payload){
        dispatch( actionCreator(payload));
    }
 */
@connect(
    (state, props) => ({ tabList: state.tabListResult }),
    (dispatch) => ({
        actions: bindActionCreators(routerActions, dispatch),
        dispatch: dispatch,
        // updateTab: (activeKey) => dispatch(updateTabChecked({ activeKey: activeKey })),
        // deleteTab: (activeKey) => dispatch(deleteTabFromList({ activeKey: activeKey })),
        tabChange: bindActionCreators(TabActionCreators, dispatch),
    })
)
export default class TabList extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }
    componentDidMount() {
    }
    // tab切换时触发
    /**
     *
     */
    onChange(activeKey) {
        // this.props.dispatch(updateTabChecked({ activeKey: activeKey }))
        // this.props.updateTab(activeKey)
        this.props.tabChange.updateTabChecked({ activeKey: activeKey })
        // this.props.actions.push(activeKey) // 切换路由
        this.props.dispatch(push(activeKey)); // push(path)产生action对象 type?
    }
    // 编辑(添加、删除)时触发
    onEdit(targetKey, action) {
        this[action](targetKey);
    }
    // 删除时触发
    remove(targetKey) {
        const { actions, tabList } = this.props;
        let delIndex = null
        let activeKey
        if (targetKey === tabList.activeKey) {
            tabList.list.map((tab, index) => {
                tab.key === targetKey ? delIndex = index : null;
            });
            activeKey = tabList.list[delIndex + 1] ?
                 tabList.list[delIndex + 1].key : (tabList.list[delIndex - 1] ?
                 tabList.list[delIndex - 1].key : '');
            actions.push(activeKey);
        }
        // this.props.dispatch(deleteTabFromList({ targetKey: targetKey }));
        // this.props.deleteTab(targetKey);
        this.props.tabChange.deleteTabFromList({ targetKey: targetKey });
    }
    // 是否需要更新组件
    shouldComponentUpdate(nextProps, nextState) {
        const thisProps = this.props || {};

        if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
            return true;
        }
        for (const key in nextProps) {
            if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
                return true;
            }
        }
        return false;
    }
    render() {
        const { tabList } = this.props
        return (
          <Tabs
            hideAdd
            type="editable-card"
            // type="type"
            onChange={this.onChange}
            onEdit={this.onEdit}
            activeKey={tabList.activeKey}
          >
            {
              tabList.list.map((tab) =>
                <TabPane tab={tab.title} key={tab.key}>{tab.content}</TabPane>)
            }
          </Tabs>
        )
    }
}

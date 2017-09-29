import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { is } from 'immutable';
import { Tabs } from 'antd'
import { updateTabChecked, deleteTabFromList } from '../../actions/tabList'

const TabPane = Tabs.TabPane

@connect(
    (state, props) => ({ tabList: state.tabListResult }),
    (dispatch) => ({
        actions: bindActionCreators(routerActions, dispatch),
        dispatch: dispatch,
        tabChange: (activeKey) => dispatch(updateTabChecked({ activeKey: activeKey })),
        tabChange2: (activeKey) => bindActionCreators(updateTabChecked({ activeKey: activeKey }), dispatch),
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
    onChange(activeKey) {
        // this.props.dispatch(updateTabChecked({ activeKey: activeKey }))
        this.tabChange(activeKey)
        this.props.actions.push(activeKey) // 切换路由
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
        this.props.dispatch(deleteTabFromList({ targetKey: targetKey }));
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

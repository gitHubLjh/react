import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { Menu, Icon, Spin } from 'antd'
import { updateTabList } from 'actions/tabList'

const SubMenu = Menu.SubMenu

@connect(
    (state, props) => ({ config: state.config }),
    (dispatch) => ({ actions: bindActionCreators(routerActions, dispatch), dispatch: dispatch })
)
export default class LeftNav extends Component {

    constructor(props, context) {
        super(props, context)

        const { pathname } = props.location
        this.state = {
            current: pathname,
            openKeys: [],
            isLeftNavMini: false,
        }

        this._handleClick = this._handleClick.bind(this)
        this._handleToggle = this._handleToggle.bind(this)
        this.navMini = this.navMini.bind(this)
        this.renderLeftNav = this.renderLeftNav.bind(this)
    }

    componentWillMount() {
        if (sessionStorage.getItem('isLeftNavMini') === 'false') {
            this.setState({
                isLeftNavMini: false,
            })
        }
        if (sessionStorage.getItem('isLeftNavMini') === 'true') {
            this.setState({
                isLeftNavMini: true,
            })
        }
    }
    // 点击Menu.Item触发，
    _handleClick(e) {
        const { actions } = this.props
        this.setState({
            current: e.key,
            openKeys: e.keyPath.slice(1), // 父menu
        }, () => {
            actions.push(e.key) // type:routing payload:{push,e.key}
            this.props.dispatch(updateTabList({ title: e.item.props.name, content: '', key: e.key }))// 传入payload
        })
    }
    // SubMenu展开/关闭触发
    _handleToggle(openKeys) { // 1,0 1
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({ openKeys: nextOpenKeys });
    }

    getAncestorKeys(key) {
        const map = {
            sub3: ['sub2'],
        };
        return map[key] || [];
    }

  // 左侧菜单切换显示模式
    navMini() {
        this.setState({
            isLeftNavMini: !this.state.isLeftNavMini,
        }, () => {
            this.props.leftNavMode(this.state.isLeftNavMini)
        })
    }
  // 菜单生成
    renderLeftNav(options) {
        const self = this
        return options.map((item, index) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.url ? item.url : item.id} name={item.name}>
                      <Icon type={item.icon} title={item.name} />
                      <span className="menu-name">{item.name}</span>
                    </Menu.Item>
                )
            } else {
                return (
                  <SubMenu key={index} title={
                        <span>
                          <Icon type="caret-down" title={item.name} />
                          <span className="menu-name">{item.name}</span>
                        </span>}>
                    {
                      item.url ?
                        <Menu.Item key={item.url} name={item.name}>
                          <Icon type={item.icon} title={item.name} />
                          <span className="menu-name">{item.name}</span>
                        </Menu.Item> : null
                    }
                    {
                      item.children && item.children.length > 0 ? self.renderLeftNav(item.children) : null
                    }
                  </SubMenu>
                )
            }
        })
    }

    render() {
        const selectedKeys = [`${this.props.location.pathname.split('$')[0]}$`.replace('/', '')]
        return (
          <div className={this.state.isLeftNavMini ? 'LeftNavMini' : ''}>
            <nav id="mainnav-container" className="mainnav-container">
                <div className="LeftNav-control" onClick={this.navMini}>
                    <i className="qqbicon qqbicon-navcontrol"/>
                </div>
                <Menu onClick={this._handleClick}
                    onOpenChange={this._handleToggle}
                    theme="dark"
                    mode="inline"
                    openKeys={this.state.openKeys} // 当前展开的subMenu
                    selectedKeys={selectedKeys} // 当前选中的menuItem
                >
                  { this.renderLeftNav(this.props.config.NAVIGATION || []) }
                </Menu>
            </nav>
          </div>
        )
    }
}

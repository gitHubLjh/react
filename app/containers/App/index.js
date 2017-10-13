
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { message } from 'antd'

import Header from './header'
import Footer from './footer'
import Extra from './extra'

import LeftNav from './leftNav'
import RightAside from './rightAside'
import TabList from './tabList'


import '../../style/base.less'

@connect(
    (state, props) => ({}),
)
export default class App extends Component {
    constructor(props, context) {
        super(props)
        this.state = {
            isLeftNavMini: false,
        }
        this.isLeftNavMini = this.isLeftNavMini.bind(this)
    }

    componentDidMount() {
        message.config({
            duration: 3,
        })
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

  // 左侧是否mini
    isLeftNavMini(val) {
        console.log(val);
        this.setState({
            isLeftNavMini: val,
        }, () => {
            sessionStorage.setItem('isLeftNavMini', val)
        })
    }

    render() {
        const { location, children } = this.props
        console.log(children)
        return (
          <div id="container" className="effect easeInOutBack mainnav-lg aside-bright">
            <Header />
            <div className="boxed">
              <div className={this.state.isLeftNavMini ? 'boxed boxed-mini' : 'boxed'}>
                <div id="content-container" className="content-container">
                  <div id="page-content">
                    <TabList />
                    {children}
                  </div>
                </div>
              </div>
              <LeftNav
                location={location}
                leftNavMode={this.isLeftNavMini}
              />
              <RightAside />
            </div>
            <Footer />
            <Extra />
          </div>
        )
    }
}

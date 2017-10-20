import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd'
import Third from './third'
// import {UnlimitedMarquee} from 'ks-unlimited-marquee'
// import {CountDownText} from 'react-sk-countdown'
import UnlimitedMarquee from '../../components/unlimitedMarquee'
import Countdown from '../../components/countdown'


@connect(
    (state, props) => ({
        config: state.config,
    })
)

export default class sub extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countingDone:false,
        }
    }

    componentDidMount() {
        console.log(this.state)
    }

    render() {
        const content = ['我啊哈哈哈', '我是2']
        return (
            <div className="page">
                <h1>我是二级页面</h1>
                <UnlimitedMarquee content={content} />
                <Countdown />
              {/*  <button className="btn">
                    按钮
                    <WaterWave color="#fff" duration={800} />
                </button>*/}
                {/*{*/}
                    {/*this.state.countingDone*/}
                        {/*?<p style={styleObj} onClick={this._sendVerifyCode.bind(this)}>获取验证码</p>*/}
                        {/*: <CountDownText*/}
                        {/*style={styleObj}*/}
                        {/*countType='seconds' // 计时类型：seconds / date*/}
                        {/*auto={true} // 自动开始*/}
                        {/*afterEnd={() => {this.setState({*/}
                            {/*countingDone:true*/}
                        {/*})}} // 结束回调*/}
                        {/*timeLeft={5} // 正向计时 时间起点为0秒*/}
                        {/*step={-1} // 计时步长，以秒为单位，正数则为正计时，负数为倒计时*/}
                        {/*startText='获取验证码' // 开始的文本*/}
                        {/*endText='获取验证码' // 结束的文本*/}
                        {/*intervalText={(sec) => sec + '秒重新获取'} // 定时的文本回调*/}
                    {/*/>*/}
                {/*}*/}
                <Third />
            </div>
        )
    }
}

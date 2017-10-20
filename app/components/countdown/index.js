import React, { Component } from 'react'
import { clone } from 'lodash'
import 'components/index.less'

export default class countdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startText: '获取验证码',
            endText: '获取验证码',
            auto: true, // 是否自动开始
            enable: true, // 是否可用
            start: 60,
            end: 0,
            step: 1, // 步长
            unit: 'second', // m,s,ms
            back: true,
            counted: 0, // 已获取次数
            maxCount: 3, // 最大次数
            interval: 5, // 时间间隔的内，默认5m
        }
        // 点击开始执行、执行中、执行结束后回调
    }
    componentWillMount() {
    }
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const styleObj = {
            color:"#fff",
            fontSize:16,
            fontWeight:"normal",
            textAlign:"center",
            margin:'0 auto',
            background:"#ee735c",
            width:120,
            height:40,
            lineHeight:'40px',
            marginTop:10,
        }
        return (
            <p style={styleObj}>
                {this.state.startText}
            </p>
        );
    }
}

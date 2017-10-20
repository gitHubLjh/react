import React, { Component } from 'react'
import { clone } from 'lodash'
import 'components/index.less'

export default class unlimitedMarquee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: [],
            speed: 1000,
            unit: 'second', // y,M,d,h,m,s,ms
            direction: 'top', // top,down,left,right
            type: 'loop', // loop,scroll
            onmousestop: true, // 鼠标是否悬停
        }
    }
    componentWillMount() {
        const content = clone(this.props.content, true)
        this.initContent(content)
    }

    initContent(content) {
        this.setState({
            ...this.state,
            content: content, // componentWillMount中修改state后不能访问，至少要在render中才能访问
        })
    }
    componentDidMount() {
        const speed = this.state.speed;
        const wrap = this.refs.wrap;
        function Marquee() {
            wrap.scrollTop++
            console.log(wrap.scrollTop)
        }

        let MyMar = setInterval(Marquee, speed);
        wrap.onmouseover = function StartScroll() {
            clearInterval(MyMar);
        };

        wrap.onmouseout = function StopScroll() {
            MyMar = setInterval(Marquee, speed);
        };
    }
    renderContent() {
        const content = this.state.content
        return (
            <ul>
                {
                    content.map((item, index) => <li key={index}>{item}</li>)
                }
            </ul>
        )
    }

    render() {
        return (
            <div ref="wrap">
                {this.renderContent()}
            </div>
        );
    }

    componentWillUnmount() {

    }
}

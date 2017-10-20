import React, { Component } from 'react'
import { Form, Input, Tooltip, Icon, Button } from 'antd'
import { clone } from 'lodash'
import 'components/index.less'

export default class captcha extends Component {
    constructor(props) {
        super(props)
        this.state = {
            length: 4,
            height: 40,
            width: 150,
            type: 'number', // latter,combine
        }
        // onClick变换验证码
    }
    componentWillMount() {
    }
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <p>
            </p>
        );
    }
}

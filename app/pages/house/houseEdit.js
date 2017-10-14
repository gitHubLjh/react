import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Spin, Form, Input, message, Row, Col, Icon, Breadcrumb, Tooltip } from 'antd'
import { fetchHouseDetail } from 'actions/house'
import { push } from 'react-router-redux'

const FormItem = Form.Item

@Form.create({
    onFieldsChange(props, items) {
    },
    // mapPropsToFields(props){ // 在componentDidMount前调用,所以不能在这里初始化异步数据,只能初始化同步数据
    //     return {
    //         //"address": {value: props.location.pathname} // 为formItem赋值，也可以通过initialValue赋值
    //     };
    // },
})

@connect(
    (state, props) => ({
        houseDetailResult: state.houseDetailResult, // didMount后store才绑定到prop上
    }),
    (dispatch, props) => ({
        dispatch: dispatch,
    })
)

export default class Edit extends Component {

    constructor(props) {
        super(props)
        this._handleBack = this._handleBack.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
        this.hasErrors = this.hasErrors.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(fetchHouseDetail({ id: 1 }, (res) => {}))
    }

    _handleBack() {
        this.props.dispatch(push('/houseManage'))
    }

    _handleSubmit() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.houseDetailResult.loading = true
                Object.keys(values).map((key) => values[key] = (values[key] && values[key].trim()))
                console.log(values);
                // todo 数据保存
                this.props.houseDetailResult.loading = false
                this.props.dispatch(push('/houseManage'))
            } else {
                message.error('数据校验失败')
            }
        });
    }
    // 响应每个filed的keyup时间
    hasErrors(fieldsError){
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    // 自定义校验
    checkAddress = (rule, value, callback) => {
        if (value && value !== '123') {
            callback('地址不正确');
        } else {
            callback();
        }
    }

    render() {
        const { houseDetailResult, form} = this.props
        const { getFieldDecorator,getFieldsError } = form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div className="page">
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
                    <Breadcrumb.Item>An Application</Breadcrumb.Item>
                </Breadcrumb>
                <Spin spinning={houseDetailResult.loading}>
                    <Form onSubmit={this._handleSubmit} layout="horizontal"  className="ant-advanced-search-form">
                        <Row gutter={16} style={{padding:5}}>
                            <Col span={12} >
                                <FormItem label={(
                                            <span>
                                                <Tooltip title="请输入建筑物地址?">
                                                    建筑物地址 <Icon type="question-circle-o" />
                                                </Tooltip>
                                            </span>
                                          )}
                                    {...formItemLayout}
                                    hasFeedback>
                                    {getFieldDecorator('address', {
                                        rules: [{
                                            required: true, message: '请输入地址',
                                        },{
                                            validator: this.checkAddress,
                                        }],
                                        initialValue: houseDetailResult.address,
                                    })(
                                        <Input placeholder="建筑物地址"
                                               prefix={<Icon type="user" />}
                                               style={{width: '250px'}}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12} >
                                <FormItem label="行政区划" hasFeedback  {...formItemLayout}>
                                    {getFieldDecorator('division', {
                                        rules: [{
                                            required: true, message: 'Please input division',
                                        }],
                                        initialValue: houseDetailResult.division,
                                    })(
                                        <Input placeholder="行政区划" size="default" style={{width: '250px'}}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={16} style={{padding:5}}>
                            <Col span={12} >
                                <FormItem label="管辖单位" hasFeedback  {...formItemLayout}>
                                    {getFieldDecorator('institutions', {
                                        rules: [{
                                            required: true, message: 'Please input institutions',
                                        }],
                                        initialValue: houseDetailResult.institutions,
                                    })(
                                        <Input placeholder="管辖单位" size="default" style={{width: '250px'}}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12} >
                                <FormItem label="管辖警员" hasFeedback  {...formItemLayout}>
                                    {getFieldDecorator('policeName', {
                                        rules: [{
                                            required: true, message: 'Please input policeName',
                                        }],
                                        initialValue: houseDetailResult.policeName,
                                    })(
                                        <Input placeholder="管辖警员" size="default" style={{width: '250px'}}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={16} style={{padding:5}}>
                            <Col span={12} >
                                <FormItem label="房屋状态" hasFeedback  {...formItemLayout}>
                                    {getFieldDecorator('houseStatus', {
                                        rules: [{
                                            required: true, message: 'Please input houseStatus',
                                        }],
                                        initialValue: houseDetailResult.houseStatus,
                                    })(
                                        <Input placeholder="房屋状态" size="default" style={{width: '250px'}}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12} >
                                <FormItem label="地址属性"  {...formItemLayout}>
                                    {getFieldDecorator('addressType', {
                                        initialValue: houseDetailResult.addressType,
                                    })(
                                        <Input placeholder="地址属性" size="default" style={{width: '250px'}}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{padding:10}}>
                            <Col span={8} offset={8}>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" disabled={ this.hasErrors(getFieldsError()) }>保存</Button>&nbsp;&nbsp;
                                    <Button onClick={this._handleBack}>返回</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Spin>
            </div>
        )
    }
}

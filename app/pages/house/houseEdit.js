import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Spin, Form, Input, message, Row, Col, Icon, Breadcrumb } from 'antd'
import { fetchHouseDetail } from 'actions/house'
import { push } from 'react-router-redux'
import ReactQuill from 'react-quill'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip} from 'recharts';

const FormItem = Form.Item
/**
 * 1.布局
 * 2.富文本编辑器
 * 3.统计图
 * 4.做一个楼盘图组件
 */
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
        this.handleChange = this.handleChange.bind(this)
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
    handleChange(value) {
        console.log(value)
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
        const data = [
            {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
            {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
            {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
            {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
            {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
            {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
        ];
        const modules= {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean']                                         // remove formatting button
            ],
        }
        // 功能和显示分开，没有相关显示也可使用对应功能，如粘贴一些红色字，但并没有字体颜色设置
        const formats=[
            'bold', 'italic', 'underline', 'strike',
            'blockquote','code-block',
            'header',
            'list', 'bullet',
            'script',
            'indent',
            'direction',
            'size',
            'header',
            'color','background',
            'font',
            'align',
            'clean'
        ]
        return (
            <div className="page">
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
                    <Breadcrumb.Item>An Application</Breadcrumb.Item>
                </Breadcrumb>
                <Spin spinning={houseDetailResult.loading}>
                    <Form onSubmit={this._handleSubmit} layout="inline">
                        <Row gutter={16} >
                            <Col span={12} >
                                <FormItem hasFeedback
                                    label='建筑物地址'>
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
                                <FormItem label="行政区划" hasFeedback >
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

                        <Row gutter={16}>
                            <Col span={12} >
                                <FormItem label="管辖单位" hasFeedback >
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
                                <FormItem label="管辖警员" hasFeedback >
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

                        <Row gutter={16} >
                            <Col span={12} >
                                <FormItem label="房屋状态" hasFeedback  >
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
                                <FormItem label="地址属性"  >
                                    {getFieldDecorator('addressType', {
                                        initialValue: houseDetailResult.addressType,
                                    })(
                                        <Input placeholder="地址属性" size="default" style={{width: '250px'}}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <FormItem label="备注"/>
                                <ReactQuill value="fdfdsfds" placeholder="请输入备注" theme="snow"
                                            onChange={this.handleChange}
                                            modules={modules}
                                            formats={formats}/>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <LineChart width={730} height={250} data={data}
                                           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                </LineChart>
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

/*
 * @Author: dupi
 * @Date: 2017-06-28 17:16:12
 * @Last Modified by: duxianwei
 * @Last Modified time: 2017-08-08 20:55:31
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link,hashHistory} from 'react-router'
import {Button, Spin, Form, Input, Table, message, Popconfirm, Modal, Tooltip, Icon} from 'antd'
import {
    fetchHouseCheckList,
    toggleModelWindow,
} from 'actions/house'

const FormItem = Form.Item

@Form.create({
    onFieldsChange(props, items) {
        //console.log(items);
    },
})

@connect(
    (state, props) => ({
        config: state.config,
        houseCheckSearchResult: state.houseCheckSearchResult, // 连接属性和store中state，只要store中state发生变化，就会重新render组件
    }),
    (dispatch, props) => ({
        dispatch: dispatch,
    })
)
export default class app extends Component {

    constructor(props) {
        super(props)
        this._handleSubmit = this._handleSubmit.bind(this)
        this._handleDelete = this._handleDelete.bind(this)
        this._handleAdd = this._handleAdd.bind(this)
    }

    /**
     * 中间件：在dispatch出对象（函数、action）后，对象到达reducer前，能够织入一些切面逻辑，如打印action、state日志，报告异常等。
     * thunk middleWare的作用：在dispatch出对象后，判断对象的类型，如果是action，直接dispatch；如果是函数，就执行该函数逻辑，并传入dispatch对象，
     * 这样就可以在函数中使用dispatch对象完成异步任务
     */
    componentDidMount() {
        // 由于使用了thunk middleWare，所以dispatch可以传入方法对象，否则，dispatch只能action
        this.props.dispatch(fetchHouseCheckList({currentPage: 1}, (res) => {}))
    }

    /**
     * 当组件存在时，根据该阶段方法返回值决定是否重新render，false不render，通常不需要处理，除非遇到性能问题。
     */
    shouldComponentUpdate(){
        return true
    }

    // 查询
    _handleSubmit(currentPage) {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Object.keys(values).map((key) => values[key] = (values[key] && values[key].trim()))
                let keyword = values['keyword']
                this.props.dispatch(fetchHouseCheckList({currentPage: 1,keyword: keyword}))
            } else {
                message.error('操作失败')
            }
        })
    }
    _handleDelete(key){
        console.log('delete',key)
    }

    // 显示model window
    _handleAdd(){
        this.props.dispatch(toggleModelWindow({ visible:true, confirmLoading: false }))
    }

    handleOk = () => {
        this.props.dispatch(toggleModelWindow({ visible:true, confirmLoading: true }))
        // 提交表单
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Object.keys(values).map((key) => values[key] = (values[key] && values[key].trim()))
                // 模拟ajax数据提交
                setTimeout(() => {
                    this.props.dispatch(toggleModelWindow({ visible:false, confirmLoading: false }))
                    message.success('操作成功');
                    this.props.dispatch(fetchHouseCheckList({currentPage: 1}, (res) => {}))
                }, 2000);
            } else {
                message.error('操作失败')
                this.props.dispatch(toggleModelWindow({ visible:true, confirmLoading: false }))
            }
        })
    }

    handleCancel = () => {
        this.props.dispatch(toggleModelWindow({ visible:false, confirmLoading: false }))
    }

    columns() {
        return [
            {
                title: '序号',
                key: 'index',
                width: 50,
                render: (text, record, index) => <span>{index + 1}</span>,
            },
            {
                title: '建筑物地址',
                dataIndex: 'address',
                key: 'address',
                width: 350,
            },
            {
                title: '行政区划',
                dataIndex: 'division',
                key: 'division',
                width: 200,
            },
            {
                title: '管辖单位',
                dataIndex: 'institutions',
                key: 'institutions',
                width: 150,
            },
            {
                title: '管辖警员',
                dataIndex: 'policeName',
                key: 'policeName',
                width: 150,
            },
            {
                title: '房屋状态',
                dataIndex: 'houseStatus',
                key: 'houseStatus',
                width: 150,
            },
            {
                title: '地址属性',
                dataIndex: 'addressType',
                key: 'addressType',
            },
            {
                title: '操作',
                key: 'operate',
                width: 250,
                render:  (text, record, index) => (
                    <span>
                        <Button>
                            <Link to={`/houseDetail`}>查看</Link>
                        </Button>&nbsp;&nbsp;
                        <Button>
                            <Link to={`/houseEdit`}>修改</Link>
                        </Button>&nbsp;&nbsp;
                         <Popconfirm title="确认删除吗?" onConfirm={() => this._handleDelete(record.key)}>
                            <Button href="#">删除</Button>
                        </Popconfirm>
                    </span>
                )
            },
        ]
    }


    render() {
        const {houseCheckSearchResult, form} = this.props
        const {getFieldDecorator} = form
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
                <Modal title="Title"
                       visible={houseCheckSearchResult.visible}
                       onOk={this.handleOk}
                       confirmLoading={houseCheckSearchResult.confirmLoading}
                       onCancel={this.handleCancel} >
                    <Form layout="inline">
                        <FormItem label='建筑物地址' {...formItemLayout} hasFeedback>
                            {getFieldDecorator('address', {
                                rules: [{
                                    required: true, message: '请输入地址',
                                }],
                            })(
                                <Input placeholder="建筑物地址"
                                   prefix={<Icon type="user" />}
                                   style={{width: '250px'}}/>
                            )}
                        </FormItem>
                        <FormItem label="行政区划" hasFeedback  {...formItemLayout}>
                            {getFieldDecorator('division', {
                                rules: [{
                                    required: true, message: 'Please input division',
                                }],
                            })(
                                <Input placeholder="行政区划" size="default" style={{width: '250px'}}/>
                            )}
                        </FormItem>

                        <FormItem label="管辖单位" hasFeedback  {...formItemLayout}>
                            {getFieldDecorator('institutions', {
                                rules: [{
                                    required: true, message: 'Please input institutions',
                                }],
                            })(
                                <Input placeholder="管辖单位" size="default" style={{width: '250px'}}/>
                            )}
                        </FormItem>
                        <FormItem label="管辖警员" hasFeedback  {...formItemLayout}>
                            {getFieldDecorator('policeName', {
                                rules: [{
                                    required: true, message: 'Please input policeName',
                                }],
                            })(
                                <Input placeholder="管辖警员" size="default" style={{width: '250px'}}/>
                            )}
                        </FormItem>

                        <FormItem label="房屋状态" hasFeedback  {...formItemLayout}>
                            {getFieldDecorator('houseStatus', {
                                rules: [{
                                    required: true, message: 'Please input houseStatus',
                                }],
                            })(
                                <Input placeholder="房屋状态" size="default" style={{width: '250px'}}/>
                            )}
                        </FormItem>
                        <FormItem label="地址属性"  {...formItemLayout}>
                            {
                                getFieldDecorator('addressType')(
                                    <Input placeholder="地址属性" size="default" style={{width: '250px'}}/>
                                )
                            }
                        </FormItem>
                    </Form>
                </Modal>

                <div className="search" style={{marginBottom: '10px'}}>
                    <Form onSubmit={this._handleSubmit} layout="inline"
                          className="ant-advanced-search-form">
                        <FormItem label="关键字">
                            {getFieldDecorator('keywork', {
                                    rules: [{
                                        required: false,
                                    }],
                                 })(<Input placeholder="请输入关键字" size="default" style={{width: '200px'}}/>)
                            }
                        </FormItem>
                        <Button type="primary" onClick={this._handleSubmit}>查询</Button>&nbsp;&nbsp;
                        <Button onClick={this._handleAdd}>新增</Button>
                    </Form>
                </div>
                <Spin spinning={houseCheckSearchResult.loading}>
                    <Table
                        bordered
                        dataSource={houseCheckSearchResult.list}
                        columns={this.columns()}
                        currentPage={houseCheckSearchResult.currentPage}
                        totalCount={houseCheckSearchResult.totalCount}
                        scroll={{y: true}}
                    />
                </Spin>
            </div>
        )
    }
}

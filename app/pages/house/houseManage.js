/*
 * @Author: dupi
 * @Date: 2017-06-28 17:16:12
 * @Last Modified by: duxianwei
 * @Last Modified time: 2017-08-08 20:55:31
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link,hashHistory} from 'react-router'
import {Button, Spin, Form, Input, Table, message, Popconfirm} from 'antd'
import {
    fetchHouseCheckList,
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
        return (
            <div className="page">
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
                        <Button type="primary" onClick={this._handleSubmit}>查询</Button>
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

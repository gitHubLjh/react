import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Spin, message, Row, Col } from 'antd'
import { fetchHouseDetail } from 'actions/house'
import { push } from 'react-router-redux'
@connect(
    (state, props) => ({
        houseDetailResult: state.houseDetailResult,
    }),
    (dispatch, props) => ({
        dispatch: dispatch,
    })
)
export default class Detail extends Component {

    constructor(props) {
        super(props)
        this._handleBack = this._handleBack.bind(this)
    }

    componentDidMount() {
        console.log('house detail didmount');
        this.props.dispatch(fetchHouseDetail({ id: 1 }, (res) => {}))
    }

    _handleBack() {
        this.props.dispatch(push('/houseManage'))
    }

    render() {
        const { houseDetailResult } = this.props
        return (
            <div className="page">
                <Spin spinning={houseDetailResult.loading}>
                    <Row gutter={32} style={{padding:5}}>
                        <Col span={12} >
                            建筑物地址:{houseDetailResult.address}
                        </Col>
                        <Col span={12} >
                            行政区划:{houseDetailResult.division}
                        </Col>
                    </Row>

                    <Row gutter={32} style={{padding:5}}>
                        <Col span={12} >
                            管辖单位:{houseDetailResult.institutions}
                        </Col>
                        <Col span={12} >
                            管辖警员:{houseDetailResult.policeName}
                        </Col>
                    </Row>

                    <Row gutter={32} style={{padding:5}}>
                        <Col span={12} >
                            房屋状态:{houseDetailResult.houseStatus}
                        </Col>
                        <Col span={12} >
                            地址属性:{houseDetailResult.addressType}
                        </Col>
                    </Row>
                    <Row gutter={32} style={{padding:10}}>
                        <Col span={8} offset={8}>
                            <Button type="primary" onClick={this._handleBack}>返回</Button>
                        </Col>
                    </Row>
                </Spin>



            </div>
        )
    }
}

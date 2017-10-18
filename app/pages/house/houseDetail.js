import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Button, Spin, message, Row, Col} from 'antd'
import {fetchHouseDetail} from 'actions/house'
import {push} from 'react-router-redux'
import FreeScrollBar from 'react-free-scrollbar';
import MultiSelect from '../../components/multiSelect'
import SearchChosen from '../../components/searchChosen'

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
        this.onFieldsChange = this.onFieldsChange.bind(this)
    }

    componentDidMount() {
        console.log('house detail didmount');
        this.props.dispatch(fetchHouseDetail({id: 1}, (res) => {
        }))
    }

    _handleBack() {
        this.props.dispatch(push('/houseManage'))
    }

    onFieldsChange(value) {
        console.log(value)
    }

    render() {
        const {houseDetailResult} = this.props
        const options = [
            {checked: true, name: 'a', id: 1}, {checked: true, name: 'b', id: 2},
            {checked: true, name: 'c', id: 3}, {checked: true, name: 'g', id: 6},
            {checked: true, name: 'd', id: 4}, {checked: true, name: 'h', id: 5},
            {checked: true, name: 'e', id: 7}, {checked: true, name: 'r', id: 8},
            {checked: true, name: 'f', id: 9}, {checked: true, name: 'm', id: 10}
        ];
        return (
            <div className="page">
                <FreeScrollBar>
                    <MultiSelect id="id" text="name" value="1" options={options} onFieldsChange={this.onFieldsChange}
                                 keyName="keyname"/>
                    <SearchChosen searchType="1" keyName="keyname" cityId="444" defaultValue="000" value="66"/>
                    <Spin spinning={houseDetailResult.loading}>
                        <Row gutter={32} style={{padding: 5}}>
                            <Col span={12}>
                                建筑物地址:{houseDetailResult.address}
                            </Col>
                            <Col span={12}>
                                行政区划:{houseDetailResult.division}
                            </Col>
                        </Row>

                        <Row gutter={32} style={{padding: 5}}>
                            <Col span={12}>
                                管辖单位:{houseDetailResult.institutions}
                            </Col>
                            <Col span={12}>
                                管辖警员:{houseDetailResult.policeName}
                            </Col>
                        </Row>

                        <Row gutter={32} style={{padding: 5}}>
                            <Col span={12}>
                                房屋状态:{houseDetailResult.houseStatus}
                            </Col>
                            <Col span={12}>
                                地址属性:{houseDetailResult.addressType}
                            </Col>
                        </Row>
                        <Row gutter={32} style={{padding: 10}}>
                            <Col span={8} offset={8}>
                                <Button type="primary" onClick={this._handleBack}>返回</Button>
                            </Col>
                        </Row>
                    </Spin>
                </FreeScrollBar>
            </div>
        )
    }
}

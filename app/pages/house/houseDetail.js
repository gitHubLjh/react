import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Button, Spin, message, Row, Col} from 'antd'
import {fetchHouseDetail} from 'actions/house'
import {push} from 'react-router-redux'
import FreeScrollBar from 'react-free-scrollbar';
import MultiSelect from '../../components/multiSelect'
import SearchChosen from '../../components/searchChosen'
import {Map} from 'react-amap'
import Heatmap from 'react-amap-plugin-heatmap'
import Geolocation from 'react-amap-plugin-geolocation'

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

        const YOUR_AMAP_KEY = '242b0a21daa39806083687e41bad75fd'
        const points = [
            {"lng": 116.191031, "lat": 39.988585, "count": 10},
            {"lng": 116.389275, "lat": 39.925818, "count": 11},
            {"lng": 116.287444, "lat": 39.810742, "count": 12},
            {"lng": 116.481707, "lat": 39.940089, "count": 13},
            {"lng": 116.410588, "lat": 39.880172, "count": 14},
            {"lng": 116.394816, "lat": 39.91181, "count": 15},
            {"lng": 116.416002, "lat": 39.952917, "count": 16}
        ];

        const visible = true;
        const radius = 30;
        const gradient = {
            '0.4': 'rgb(0, 255, 255)',
            '0.65': 'rgb(0, 110, 255)',
            '0.85': 'rgb(100, 0, 255)',
            '1.0': 'rgb(100, 0, 255)',
        };
        const zooms = [3, 18];
        const dataSet = {
            data: points,
            max: 100,
        }

        const pluginProps = {
            visible,
            radius,
            gradient,
            zooms,
            dataSet,
        }

        const pluginProps2 = {
            enableHighAccuracy: true,
            timeout: 10000,
            showButton: true,
        }
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
                    <Map amapkey={YOUR_AMAP_KEY} >
                        <Heatmap {...pluginProps} />
                        <Geolocation {...pluginProps2} />
                    </Map>
                </FreeScrollBar>
            </div>
        )
    }
}

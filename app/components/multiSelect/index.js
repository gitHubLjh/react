import React, {Component} from 'react'
import {chunk, clone} from 'lodash'
import {Row, Col, Checkbox, Button} from 'antd';
import 'components/index.less'

export default class multiSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            options: [],
            open: false,
            checkAll: false,
        }
        this.handleToggleSelect = this.handleToggleSelect.bind(this)
        this.toggleCheckAll = this.toggleCheckAll.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.hide = this.hide.bind(this)
    }

    handleToggleSelect() {
        this.setState({
            open: !this.state.open,
        })
    }

    hide(event) {
        if (event.target.closest('.multi-select')) {
            return;
        }
        this.setState({
            open: false,
        })
    }

    componentWillMount() {
        let options = clone(this.props.options, true)
        const values = this.props.value
        options = this.initData(options, values)
        this.setState({
            options: options,
        })
        document.addEventListener('click', this.hide)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.hide)
    }

    initData(options, values) {
        const id = this.props.id // id
        const valuesArr = values.split(',') // [1]
        options.map((option) => {
            option.checked = valuesArr.indexOf(option[id].toString()) !== -1
        })
        valuesArr.length === options.length ? this.setState({
            checkAll: true,
        }) : null
        return options;
    }

    getValue() {
        let value = ''
        const text = this.props.text
        this.state.options.map((option) => {
            value += option.checked ? `${option[text]},` : ''
        })
        if(value!=''){
            value=value.substr(0,value.length-1)
        }
        return value;
    }

    renderRow(row, index) {
        const id = this.props.id // id
        const text = this.props.text; // name
        return (
            <Row key={index} className="multi-select-row">
                {
                    row.map((option, key) => <Col span={6} key={key}>
                        <Checkbox checked={option.checked === true}
                              value={option[id]}
                              onChange={this.handleToggleChecked(option)}
                        >
                            {option[text]}
                        </Checkbox>
                    </Col>)
                }
            </Row>
        )
    }

    handleToggleChecked(option) {
        return () => {
            option.checked = !option.checked;
            let checkAll = true;
            for (let i = 0, l = this.state.options.length; i < l; i++) {
                if (!this.state.options[i].checked) {
                    checkAll = false
                }
            }
            this.setState({
                options: this.state.options,
                checkAll: checkAll,
            })
        }
    }

    toggleCheckAll() {
        const checkAll = !this.state.checkAll;
        if (checkAll) {
            this.state.options.map((option) => {
                option.checked = true
            })
        } else {
            this.state.options.map((option) => {
                option.checked = false
            })
        }
        this.setState({
            checkAll: checkAll,
            options: this.state.options,
        })
    }

    handleSave() {
        const checkedArr = []
        const id = this.props.id;
        this.state.options.map((option) => {
            option.checked ? checkedArr.push(option[id]) : null
        })
        this.props.onFieldsChange({
            [this.props.keyName]: checkedArr.toString(),
        })
        this.setState({
            open: false,
        })
    }

    render() {
        const value = this.getValue();
        const options = this.state.options;
        return (
            <div className="multi-select">
                <div className="multi-select-single" onClick={this.handleToggleSelect}>
                    <a title={value}>{value}</a>
                    <i className="ant-select-arrow" aria-hidden="false"/>
                </div>
                <div className={this.state.open ? 'multi-select-drop' : 'multi-select-drop hide'}>
                    <Row>
                        <Checkbox checked={this.state.checkAll} onChange={this.toggleCheckAll}>全选</Checkbox>
                    </Row>
                    <Row>
                        {
                            chunk(options, 4).map((row, index) => this.renderRow(row, index))
                        }
                    </Row>
                    <Row>
                        <Button type="primary" onClick={this.handleSave}>确定</Button>
                    </Row>
                </div>
            </div>
        );
    }
}

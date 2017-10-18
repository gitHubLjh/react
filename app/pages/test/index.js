import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Cascader, Select, Row, Col, Checkbox, Button, Switch, Slider } from 'antd'
import { SketchPicker } from 'react-color'
import CodeMirror from 'react-codemirror'
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react'
import FreeScrollBar from 'react-free-scrollbar';
import NProgress from 'nprogress'
import ColorPicker from 'rc-color-picker';
import {
    changeQRCodeColor,
    changeQRCodeLevel,
    copy,
    changeCopyContent,
    changeCodeMirrorMode,
    changeCodeMirrorReadOnly,
} from 'actions/test'
import Sub from './sub'
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

const Option = Select.Option;

@connect(
    (state, props) => ({
        config: state.config,
        QRCodeStateResult: state.QRCodeStateResult,
    }),
    (dispatch, props) => ({
        dispatch: dispatch,
    }),
)
/**
 * 取色器
 * 代码编辑器
 * 页面加载进度条（进一步理解react组件生命周期）：
 * 页面滚动条
 * 二维码
 */
export default class popCheck extends Component {
    // 创建组件时调用
    constructor(props) {
        super(props)
        this.onCopy = this.onCopy.bind(this)
        this.changeColorHandler = this.changeColorHandler.bind(this)
        this.changeLevelHandler = this.changeLevelHandler.bind(this)
        this.updateCodeHandler = this.updateCodeHandler.bind(this)
        this.changeCodeMirrorModeHandler = this.changeCodeMirrorModeHandler.bind(this)
        this.changeCodeMirrorReadOnlyHandler = this.changeCodeMirrorReadOnlyHandler.bind(this)
        // 设置开始值，默认0.8
        NProgress.configure({ minimum: 0.1 });
        NProgress.configure({ showSpinner: false });
    }

    changeColorHandler(colors) {
        console.log(colors);
        this.props.dispatch(changeQRCodeColor({ fgcolor: colors }))
    }
    changeLevelHandler(level) {
        console.log(level)
        const marks = {
            0: 'L',
            33: 'M',
            66: 'Q',
            100: 'H',
        }
        console.log(marks[level])
        this.props.dispatch(changeQRCodeLevel({ level: marks[level] }))
    }
    updateCodeHandler(newCode) {
        this.props.dispatch(changeCopyContent({ content: newCode }))
    }
    changeCodeMirrorModeHandler(value) {
        const mode_content = {
            'javascript': 'var component = {name: "react-codemirror",author: "Jed Watson",repo: "https://github.com/JedWatson/react-codemirror"};',
            'xml': '<person><name>张三</name></person>',
            'json': '{"person":5,"age":0}',
            'markdown': '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)',
        }
        console.log(mode_content[value])
        this.props.dispatch(changeCodeMirrorMode({ mode: value, content: mode_content[value] }))
    }
    changeCodeMirrorReadOnlyHandler(checked) {
        console.log(checked)
        this.props.dispatch(changeCodeMirrorReadOnly({ readOnly: checked }))
    }
    onCopy() {
        console.log('copied');
        this.props.dispatch(copy())
    }

    // 组件挂载前调用，如果在这里setState，本次render可以看到并使用
    componentWillMount() {
        NProgress.set(0.3);
        console.log('will mount')
    }
    /**
     * render方法调用两次
     * 1.组件挂载时调用，此时只能使用本组建的state，不能使用父组件中的state
     * 2.组件挂载并收到父组件传递的prop后，在调用一次，从而可以使用父组件中的state
     */
    render() {
        NProgress.set(0.7);
        const { QRCodeStateResult } = this.props
        const options = {
            lineNumbers: true,
            lineWrapping: true,
            mode: QRCodeStateResult.CodeMirrorMode,
            readOnly: QRCodeStateResult.CodeMirrorReadOnly,
        };
        const marks = {
            0: 'L',
            33: 'M',
            66: 'Q',
            100: 'H',
        };
        return (
            <div className="page">
                <FreeScrollBar>
                    <div style={{ margin: '20px 20px 20px' }}>
                        <ColorPicker
                          animation="slide-up"
                          color={QRCodeStateResult.QRCodeFgColor}
                          onChange={this.changeColorHandler}
                        />
                    </div>
                    {/* <SketchPicker />*/}
                    <Slider included={false} marks={marks} step={null} defaultValue={66} onChange={this.changeLevelHandler} />
                    <QRCode value="www.oursuperb.cn" fgColor={QRCodeStateResult.QRCodeFgColor} level={QRCodeStateResult.QRCodeLevel} />
                    <div>
                        <CopyToClipboard onCopy={this.onCopy} text={QRCodeStateResult.CodeMirrorContent}>
                            <span>复制</span>
                        </CopyToClipboard>
                    </div>
                    { QRCodeStateResult.copied === true ? <div style={{ color: 'red' }}>已copy</div> : null }

                    Mode<Select defaultValue="javascript" style={{ width: 120 }} onChange={this.changeCodeMirrorModeHandler}>
                        <Option value="javascript">javascript</Option>
                        <Option value="xml">xml</Option>
                        <Option value="json">json</Option>
                        <Option value="markdown">markdown</Option>
                    </Select>&nbsp;&nbsp;
                    ReadOnly<Switch checkedChildren={'on'} unCheckedChildren={'off'}  defaultChecked={false} onChange={this.changeCodeMirrorReadOnlyHandler} />,
                    <CodeMirror autoFocus={true} value={QRCodeStateResult.CodeMirrorContent} options={options} onChange={this.updateCodeHandler} />
                    <Sub />
                </FreeScrollBar>
            </div>
        )
    }

    // 组件挂载后调用，这里可以使用refs获取真实dom
    componentDidMount() {
        NProgress.done();
        console.log('did mount')
    }

    // 组件挂载完成后，会接收父组件传递给自己的props，该方法在组件在接收props前调用
    componentWillReceiveProps(nextProps) {
        console.log('will receive props')
    }

    // 组件接收到prpos后，判断组件是否需要render，默认返回true，可以优化渲染效率
    shouldComponentUpdate(nextProps, nextState) {
        console.log('should update')
        return true
    }

    // 在组件render前
    componentWillUpdate(nextProps, nextState) {
        console.log('will update')
    }

    // rendering，可使用父组件props
    // 组件render后
    componentDidUpdate() {
        NProgress.done();
        console.log('did update')
    }

    // 组件卸载时，可以做一些销毁工作，如定时器移除等
    componentWillUnmount() {
        NProgress.remove();
        console.log('will unmount')
    }

}

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'  //连接react容器组件与redux的store
import {hashHistory} from 'react-router'
import {Spin, message, Form, Icon, Input, Button, Row, Col} from 'antd'
import {fetchLogin} from 'actions/common'
const FormItem = Form.Item

/**
 * es7新写法,相当于
 const mapStateToProps = state => ({
        config: state.config,
        loginResponse: state.loginResponse,
  })
 export default connect(mapStateToProps)(Login);对ui组件(Login)包装，产生一个新的逻辑组件(Connect)，ui组件作为其子组件，
 这样父逻辑组件的改变，就能传递给子ui组件，进而重新渲染ui组件。

 connect(mapStateToProps,mapDispatchToProps)(Component)用于连接组件props到store(state,dispatch)
 */
@connect(
    (state, props) => {
        return {
            config: state.config,
            loginResponse: state.loginResponse,
        }
    },
    /**
     * mapDispatchToProps也可以是一个对象，如：
     * {
     *   submit: (data) => {
                type: 'SET_VISIBILITY_FILTER',
                data: data
            };
     * }
     * submit作为prop传递给Login组件，submit对应的是一个方法，该方法是ActionCreator，要产生一个action，之后，redux会自动的将该action dispatch出去
     */
    (dispatch, props) => {
        return {
            //将submit作为prop传递给Login组件，当login组件触发该属性时，调用对应的方法bindActionCreators，该方法会自动将action dispatch出去
            submit: bindActionCreators({'type': 'A'}, dispatch),
        }
    }
)
/**
 * 连接自定义组件与antd组件，相当于：
 * export default Form.create({onFieldsChange,mapPropsToFields})(Login);//产生一个新的Form组件，对Login组件进行包装，
 * Login组件作为Form组件的子组件，Form组件可以监听Form.Item组件变化，并将变化传递给子Login组件
 *
 * onFieldsChange：监听表单数据变化，可以取到最新的表单数据放入store
 * mapPropsToFields：可以从store中取出数据并放入Form.Item中
 */
@Form.create({
    onFieldsChange(props, items) {//表单项（from.item）变化时触发，items表单项相关的对象
        console.log(items);
    },
    mapPropsToFields(props){

    }
})

export default class Login extends Component {
    // 初始化页面常量 绑定事件方法
    constructor(props, context) {
        super(props)
        this.state = {
            loading: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)//bind(this)的目的是让事件处理函数拥有上下文信息，这是js语言特性决定的
        this.checkPass = this.checkPass.bind(this)
        this.checkName = this.checkName.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.state.loading = true
                Object.keys(values).map((key) => values[key] = (values[key] && values[key].trim()))
                // fetchLogin(values, (res) => {
                //     if (res.status == 1) {
                //         const query = this.props.form.getFieldsValue()
                //         global.$GLOBALCONFIG.staff = res.data.user
                //         sessionStorage.setItem('staff', JSON.stringify({...res.data.user}))
                //         sessionStorage.setItem('username', query.username)
                //         // sessionStorage.setItem('userName', res.data.user.userName)
                //         // sessionStorage.setItem('userpwd', query.password)
                //         sessionStorage.setItem('token', res.data.token)
                //         sessionStorage.setItem('isLeftNavMini', false)
                //         hashHistory.push('/')
                //     }
                // }, (res) => {
                //     message.warning(res.msg)
                //     this.setState({
                //         loading: false
                //     })
                // });
                sessionStorage.setItem('token', 'dupi')
                hashHistory.push('/')
            } else {
                //弹出错误
                message.error('登录失败')
            }
        })
    }


    componentDidMount() {
        console.log("load finish");
    }

    checkName(rule, value, callback) {
        if (value) {

        }
        callback()
    }

    checkPass(rule, value, callback) {
        if (value) {
        }
        callback()
    }


    render() {
        const {getFieldDecorator} = this.props.form //经Form包装后，组件自带props.form属性
        return (
            <div>
                <div className="sy_top"></div>
                <div className="btmLogin">
                    <div className="sy_bottom">
                        <h1 id="PerformName">肚皮叔</h1>
                        <Row className="ul-wrap">
                            <Col span={24}>
                                <Spin spinning={this.state.loading}>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormItem hasFeedback>
                                            {getFieldDecorator('username', {
                                                rules: [
                                                    {required: true, message: '请输入用户名'},
                                                    {validator: this.checkName}, //自定义校验规则
                                                    // { pattern: regExpConfig.IDcardTrim, message: '身份证号格式不正确' }
                                                ],
                                            })(
                                                <Input
                                                    prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                    placeholder="请输入用户名"
                                                    type="text"
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem hasFeedback>
                                            {getFieldDecorator('password', {
                                                rules: [
                                                    {required: true, message: '请输入密码'},
                                                    {validator: this.checkPass}, //自定义校验规则
                                                    // { pattern: regExpConfig.pwd, message: '密码只能是6-16个数字或者字母组成' }
                                                ],
                                            })(
                                                <Input
                                                    prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                    placeholder="请输入密码"
                                                    type="password"
                                                />
                                            )}

                                        </FormItem>
                                        <FormItem>
                                            <Button type="primary" htmlType="submit">登录</Button>
                                        </FormItem>
                                    </Form>
                                </Spin>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div id="companyName" className="companyName">肚皮叔股份有限公司</div>
            </div>
        )
    }
}

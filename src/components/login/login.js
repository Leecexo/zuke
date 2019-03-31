import React, { Component } from 'react'
import { Button, Flex, WhiteSpace, List, InputItem } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css'
import './login.css';
import axios from '../../http';
import zkpng from '../../zuke.png';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uname: '',
            pwd: ''
        }
    }
    changeVal = (vname, val) => {
        this.setState({
            [vname]: val
        })
    }
    gotoLogin = async () => {
        const { history } = this.props
        const body = this.state
        const res = await axios.post(`users/login`, body)
        // console.log(res);
        const { data, meta: { status } } = res.data
        if (status === 200) {
            history.push('/')
            // console.log(data)
            localStorage.setItem('token', data.token) // 存储当前用户的toke值 
            localStorage.setItem('uid', data.uid) // 存储当前用户信息 
            localStorage.setItem('uname', data.uname) // 存储当前用户信息
        }
    }
    render() {
        return (
            <div className={"loginTop"}>
                <Flex direction="column" justify="center">
                    <Flex.Item className={"loginLogo"}>
                        {/* <NavBar mode="dark">登陆</NavBar> */}
                        <img src={zkpng} alt="Logo" />
                    </Flex.Item>
                    <WhiteSpace size="lg" />
                    <Flex.Item>
                        <List>
                            <InputItem
                                value={this.state.uname}
                                onChange={(val) => {
                                    this.changeVal("uname", val)
                                }}
                                clear="ture"
                                className={"inputBgc"}
                            >用户名</InputItem>
                            <InputItem
                                clear="ture"
                                type="password"
                                value={this.state.pwd}
                                onChange={(val) => {
                                    this.changeVal("pwd", val)
                                }}
                                className={"inputBgc"}
                            >密&nbsp;&nbsp;&nbsp;&nbsp;码</InputItem>
                        </List>
                        <WhiteSpace size="lg" />
                        <Button type="primary" className={"loginbtn"} onClick={this.gotoLogin}>登陆</Button>
                        <WhiteSpace size="lg" />
                        <div className={"loginRe"}>
                            <span className={"leftRe"}><a>忘记密码？</a></span>
                            <span className={"rightRe"}><a>注册新用户</a></span>
                        </div>
                    </Flex.Item>
                </Flex>

            </div>
        )
    }
}

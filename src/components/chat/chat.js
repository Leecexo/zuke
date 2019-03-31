import React, { Component } from 'react'
import { NavBar, Card, } from 'antd-mobile';
import axios from '../../http';
export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            list: []
        }
    }
    click = () => {
        const { history } = this.props.props
        console.log(history);

        history.push('/catDetails')
    }
    componentDidMount = async () => {
        // 当前tab标题
        const { title } = this.props
        this.setState({
            text: title
        })
        // 发送数据请求
        const res = await axios.post(`chats/list`)
        const { data: { list }, meta } = res.data
        if (meta.status === 200) {
            console.log(list);
            let arr = []
            list.map((item, i) => {
                return arr.push(<div className={"clearfix"} key={i} onClick={this.click}>
                    <div className={"catLeft"}>
                        <img src="http://127.0.0.1:8086/public/icon.png" alt="" />
                    </div>
                    <Card full className={"catRight"}>
                        <Card.Header
                            title={item.username}
                            extra={<span>{item.ctime}</span>}
                        />
                        <Card.Body>
                            <div>{item.chat_msg}</div>
                        </Card.Body>
                    </Card>
                </div>)
            })
            this.setState({
                list: arr
            })
        }



    }

    render() {
        return (
            <div>
                {/* 顶部标题及返回上一页 */}
                <NavBar mode="light" className="posFixd">{this.state.text}</NavBar>
                {/* 列表详情 */}
                {this.state.list}
            </div>
        )
    }
}

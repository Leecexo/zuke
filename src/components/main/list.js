import React, { Component } from 'react'
import { NavBar, Icon, WhiteSpace, Card, Tag } from 'antd-mobile'
import axios from '../../http';
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            list: [],
        }
    }
    componentDidMount = async () => {

        const { id, text } = this.props.location.state.query.params
        // console.log(text, id);
        const res = await axios.post(`homes/list`, { home_type: id })
        const { meta, data } = res.data
        if (meta.status === 200) {
            let arr = []
            data.map((item, i) => {
                return arr.push(
                    <div key={i}>
                        <Card>
                            <Card.Body>
                                <div>
                                    <span className={"conentleft"}>
                                        <img src={item.home_price} alt={item.home_name} />
                                    </span>
                                    <span className={"conentright"}>
                                        <h4>{item.home_name}</h4>
                                        <span>{item.home_desc}</span>
                                        <Tag selected>{item.home_tags}</Tag>
                                    </span>
                                </div>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="xs" />
                    </div>
                )
            })
            this.setState({
                text,
                list: arr
            })
        }
    }
    onLeftClick = () => {
        const { history } = this.props
        history.goBack()
    }
    render() {


        return (
            <div>
                {/* 顶部标题及返回上一页 */}
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.onLeftClick}
                >{this.state.text}</NavBar>
                {/* 主体列表部分 */}
                {this.state.list}
                <WhiteSpace size="sm" />
            </div>
        )
    }
}

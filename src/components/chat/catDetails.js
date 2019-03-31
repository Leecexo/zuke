import React, { Component } from 'react'
import { NavBar, Icon, WhiteSpace, Card, Tag } from 'antd-mobile'
export default class CatDetails extends Component {
    componentDidMount() {
        console.log(this.props);

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
                >-----</NavBar>
            </div>
        )
    }
}

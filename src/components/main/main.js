import React, { Component } from 'react'
import { SearchBar, WingBlank, Carousel, Grid, NoticeBar, Card, Tag, WhiteSpace } from 'antd-mobile'
import axios from '../../http';
import './main.css'
export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [], // banner图数组
            imgHeight: 176,
            serverData: Array.from(new Array(8)).map((_val, i) => ({
                icon: 'http://127.0.0.1:8086/public/ico/01.png',
                text: `name${i}`,
            })), // 八大服务数组
            news: '快讯: 租房网为您整理播报房市最新资讯...', // 首页新闻
            aqData: [], // 首页问答
            fyData: [], // 首页房源
        }
    }
    componentDidMount = async () => {
        // 获取轮播图
        const res1 = await axios.post(`homes/swipe`)
        const { data, meta } = res1.data
        if (meta.status === 200) {
            this.setState({
                list: data.list
            })
        }
        // 获取八大服务
        const res2 = await axios.post(`homes/menu`)
        const { data: data1, meta: meta1 } = res2.data
        if (meta1.status === 200) {
            let arr = []
            data1.list.map((item, i) => {
                arr.push({ icon: `http://127.0.0.1:8086/public/ico/0${i + 1}.png`, text: item.menu_name })
            })
            this.setState({
                serverData: arr
            })
        }
        // 获取首页新闻
        const res3 = await axios.post(`homes/info`)
        const { data: data3, meta: meta3 } = res3.data
        if (meta3.status === 200) {
            this.setState({
                news: data3.list[1].info_title
            })
        }
        // 获取首页问答
        const res4 = await axios.post(`homes/faq`)
        const { data: data4, meta: meta4 } = res4.data
        if (meta4.status === 200) {
            const arr = []
            data4.list.map((item, i) => {
                return arr.push(
                    <div key={i}>
                        <Card>
                            <Card.Header title={item.question_name} thumb="http://127.0.0.1:8086/public/ico/10.png" />
                            <Card.Body>
                                <div><img src={`http://127.0.0.1:8086/public/ico/13.png`}></img> {item.answer_content}</div>
                            </Card.Body>
                            <Card.Footer content={item.question_tag} extra={<div><img src={`http://127.0.0.1:8086/public/ico/11.png`}></img>{item.atime} <img src={`http://127.0.0.1:8086/public/ico/12.png`}></img>{item.qnum} </div>} />
                        </Card>
                        <WhiteSpace size="xs" />
                    </div>
                )
            })
            this.setState({
                aqData: arr
            })
        }
        // 获取首页房源
        const res5 = await axios.post(`homes/house`)
        const { data: data5, meta: meta5 } = res5.data
        if (meta5.status === 200) {
            let arr = []
            data5.list.map((item, i) => {
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
                fyData: arr
            })
        }
    }
    render() {
        return (
            <div className={"topsearch"}>
                {/* 搜索框 */}
                <SearchBar placeholder="请输入关键词" />
                <WingBlank size="sm">
                    {/* 轮播图 */}
                    <Carousel infinite>
                        {this.state.list.map(val => (
                            <a
                                key={val}
                                href="http://127.0.0.1:3000"
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                                <img
                                    src={val.original}
                                    alt="图片加载中..."
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                    <WhiteSpace size="sm" />
                    {/* 8大服务内容 */}
                    <Grid data={this.state.serverData} isCarousel onClick={_el => console.log(_el)} />
                    <WhiteSpace size="sm" />
                    {/* 通知新闻 */}
                    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                        {this.state.news}
                    </NoticeBar>
                    <WhiteSpace size="sm" />
                    {/* 问题内容 */}
                    {this.state.aqData}
                    <WhiteSpace size="sm" />
                    {/* 房源 */}
                    <div className={"indexNewsFangyuan"}>
                        <h3>最新房源</h3>
                    </div>
                    {this.state.fyData}
                    <WhiteSpace size="sm" />
                </WingBlank>
            </div>
        )
    }
}

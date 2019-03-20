import React, { Component } from 'react'
import { NavBar, WhiteSpace, Card, Tag, Tabs, WingBlank, }
    from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'
import moment from 'moment';
import ReactPullLoad, { STATS } from "react-pullload"
// import "node_modules/react-pullload/dist/ReactPullLoad.css"

import axios from '../../http';
export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            tabs: [
                { id: 1, title: '新闻' },
                { id: 2, title: '资讯' },
                { id: 3, title: '问答' },
            ],
            pagenum: 0,
            pagesize: 2,
            type: 1,
            newslist: [], // 新闻列表数据
            datalist: [], // 资讯列表数据
            callist: [], // 问答列表数据

            hasMore: true,
            data: [],
            // action: STATS.init,
            index: 0 //loading more test time limit
        }
    }
    // let statusPassTime = moment(parseInt(entity.statusPassTime)).format('YYYY-MM-DD');
    getData = async () => {
        console.log(STATS);

        const res = await axios.post(`infos/list`, {
            pagenum: this.state.pagenum,
            pagesize: this.state.pagesize,
            type: this.state.type
        })
        const { meta, data } = res.data
        // console.log(data.list);

        if (meta.status === 200) {
            // 根据不同的type值，取不同的list数组
            if (this.state.type === 1) {
                this.setState({
                    newslist: data.list
                }, () => {
                    this.dispoesData(this.state.newslist)
                })
            }
            if (this.state.type === 2) {
                console.log(data.list);

                this.setState({
                    newslist: data.list
                }, () => {
                    this.dispoesData(this.state.newslist)
                })
            }
            // if (this.state.type === 3) {
            //     this.setState({
            //         newslist: data.list
            //     })
            // }
        }
    }
    // 获取当前列表标题
    componentDidMount() {
        this.getData()
        const { title } = this.props
        this.setState({
            text: title
        })
    }
    // tab内容
    renderTabBar = (props) => {
        return (<Sticky>{
            ({ style }) =>
                <div style={{ ...style, zIndex: 1 }}>
                    <Tabs.DefaultTabBar {...props} />
                </div>}
        </Sticky>)
    }
    // tab数据
    tabChangeDate = (index) => {
        // console.log(index);
        this.setState({
            type: index.id
        }, () => {
            this.getData()
        })
    }
    // 封装列表数据处理
    dispoesData = (list) => {
        console.log(list);
        const { data, total } = list
        let arr = []
        data.map((item, i) => {
            return arr.push(
                <Card key={i}>
                    <Card.Body>
                        <div>
                            <span className={"conentleft"}>
                                <img src={item.info_thumb} alt={item.info_title} />
                            </span>
                            <span className={"conentright"}>
                                <h4>{item.info_title}</h4>
                                {/* <span>{item.info_time}</span> */}
                                <Tag selected>{moment(item.info_time).format("YYYY-MM-DD")}</Tag>
                            </span>
                        </div>
                    </Card.Body>
                    <WhiteSpace size="xs" />
                </Card>
            )
        })
        this.setState({
            datalist: arr
        })
    }
    render() {

        return (
            <div>

                {/* 顶部标题及返回上一页 */}
                <NavBar mode="light">{this.state.text}</NavBar>
                {/* <WhiteSpace size="sm" /> */}
                <WhiteSpace size="sm" />
                {/* Tab切换 */}
                <StickyContainer>
                    <Tabs tabs={this.state.tabs}
                        initalPage={'t2'}
                        renderTabBar={this.renderTabBar}
                        onChange={this.tabChangeDate}
                    >
                        <div>
                            {this.state.datalist}
                        </div>
                        <div>
                            {this.state.datalist}
                        </div>
                        <div>
                            {/* {this.state.newslist} */}
                        </div>
                    </Tabs>
                </StickyContainer>
                {/* 主体组件 */}

            </div>
        )
    }
}

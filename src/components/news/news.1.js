import React, { Component } from 'react'
import { NavBar, WhiteSpace, Card, Tag, Tabs, WingBlank, }
    from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'
import moment from 'moment';
import ReactPullLoad, { STATS } from "react-pullload"
import "../css/ReactPullLoad.css"
import './news.css'
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
            loadpagesize: 2,
            type: 1,
            total: 0,
            newslist: [], // 新闻列表数据
            datalist: [], // 资讯列表数据
            callist: [], // 问答列表数据

            hasMore: true, // 是否还有加载更多
            data: [], // 存储上次的数组
            action: STATS.init, // 状态是否改变
            index: 0 //loading more test time limit
        }
    }
    // 获取数据
    getData = async () => {
        const res = await axios.post(`infos/list`, {
            pagenum: this.state.pagenum,
            pagesize: this.state.loadpagesize,
            type: this.state.type
        })
        const { meta, data } = res.data
        console.log(this.state.type);
        console.log(data);


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
            type: index.id,
            loadpagesize: this.state.pagesize,
        }, () => {
            this.getData()
        })
    }
    // 封装列表数据处理
    dispoesData = (list) => {
        // console.log(list);
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
            datalist: arr,
            total: total,
            index: total - this.state.datalist.length,
        })
    }


    // 判断是否有动作指令
    handleAction = action => {
        // console.info(action, this.state.action, action === this.state.action);
        // 新的指令不等于旧指令，直接退出
        if (action === this.state.action) {
            return false;
        }

        if (action === STATS.refreshing) {
            //刷新
            this.handRefreshing();
        } else if (action === STATS.loading) {
            //加载更多
            this.handLoadMore();
        } else {
            //不满足下拉或是加载更多，则不修改
            this.setState({
                action: action
            });
        }
    };
    // 下拉刷新
    handRefreshing = () => {
        // 新的指令不等于旧指令，直接退出
        if (STATS.refreshing === this.state.action) {
            return false;
        }
        // 定时器
        setTimeout(() => {
            // 刷新改值

            // 处理要刷新要用每页条数等数据
            this.setState({
                loadpagesize: this.state.pagesize,
                hasMore: true,
                action: STATS.refreshed,
            });
            // 发送数据请求
            this.getData()

        }, 1000);

        this.setState({
            action: STATS.refreshing
        });
    };

    handLoadMore = () => {
        if (STATS.loading === this.state.action) {
            return false;
        }
        //无更多内容则不执行后面逻辑
        if (!this.state.hasMore) {
            return;
        }

        setTimeout(() => {
            // 加载更多
            if (this.state.index === 0) {
                // 如果最后反回数据长度-最后数组长度为0 ，则不再显示加载更多
                this.setState({
                    action: STATS.reset,
                    hasMore: false
                });
            } else {
                // 如果返回数据长度最后 不为0 
                this.setState({
                    // 处理要刷新要用每页条数等数据
                    loadpagesize: this.state.loadpagesize + this.state.pagesize, // 每页几条
                    action: STATS.reset,
                });
                // 发送数据请求
                this.getData()
            }
        }, 1000);

        this.setState({
            action: STATS.loading
        });
    };


    render() {
        const { hasMore } = this.state;
        return (
            <div>

                {/* 顶部标题及返回上一页 */}
                <NavBar mode="light" className="posFixd">{this.state.text}</NavBar>
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
                            <ReactPullLoad
                                // downEnough={0} // 下拉的距离 用于触发下拉刷新
                                action={this.state.action} // 用于同步状态
                                handleAction={this.handleAction} // 用于处理状态
                                hasMore={hasMore} // 是否还有更多内容可加载 bool,默认是true
                            // style={{ paddingTop: 50 }}
                            // distanceBottom={1000} // 距离底部距离触发加载更多
                            >
                                {/* 展开数据 */}
                                {this.state.datalist}
                                {/* <a href="javascript:" onClick={this.handLoadMore}>loading more</a> */}
                            </ReactPullLoad>
                        </div>
                        <div>
                            <ReactPullLoad
                                // downEnough={0} // 下拉的距离 用于触发下拉刷新
                                action={this.state.action} // 用于同步状态
                                handleAction={this.handleAction} // 用于处理状态
                                hasMore={hasMore} // 是否还有更多内容可加载 bool,默认是true
                            // style={{ paddingTop: 50 }}
                            // distanceBottom={1000} // 距离底部距离触发加载更多
                            >
                                {/* 展开数据 */}
                                {this.state.datalist}
                                {/* <a href="javascript:" onClick={this.handLoadMore}>loading more</a> */}
                            </ReactPullLoad>
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

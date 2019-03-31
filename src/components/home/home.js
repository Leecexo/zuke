import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
import Main from '../main/main';
import News from '../news/news.1';
import Chat from '../chat/chat';
import My from '../my/my';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'blueTab',
            hidden: false,
            fullScreen: true,
        }
    }
    renderContent = (pageText) => {
        const state = this.state.selectedTab
        if (state === 'blueTab') {
            return <Main props={this.props} />
        } else if (state === 'redTab') {
            return <News title={pageText} />
        } else if (state === 'greenTab') {
            return <Chat title={pageText} props={this.props} />
        } else if (state === 'yellowTab') {
            return <My />
        }
    }
    render() {
        return (
            <div style={
                this.state.fullScreen
                    ? { position: 'fixed', height: '100%', width: '100%', top: 0 }
                    : { height: 400 }
            }>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#FDB143"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    tabBarPosition="bottom"
                >
                    <TabBar.Item
                        title="首页"
                        key="main"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(http://127.0.0.1:8086/public/index-1.fw.png) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(http://127.0.0.1:8086/public/index-2.fw.png) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                        }}
                    // data-seed="logId"
                    >
                        {this.renderContent('Main')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(http://127.0.0.1:8086/public/news-1.fw.png) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(http://127.0.0.1:8086/public/news-2.fw.png) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="资讯"
                        key="news"
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            });
                        }}
                    // data-seed="logId1"
                    >
                        {this.renderContent('资讯')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(http://127.0.0.1:8086/public/chat-1.fw.png) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(http://127.0.0.1:8086/public/chat-2.fw.png) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="消息"
                        key="chat"
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'greenTab',
                            });
                        }}
                    >
                        {this.renderContent('消息')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{ uri: 'http://127.0.0.1:8086/public/my-1.fw.png' }}
                        selectedIcon={{ uri: 'http://127.0.0.1:8086/public/my-2.fw.png' }}
                        title="我的"
                        key="my"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
                            });
                        }}
                    >
                        {this.renderContent('我的')}
                    </TabBar.Item>
                </TabBar>
            </div>
        )
    }
}

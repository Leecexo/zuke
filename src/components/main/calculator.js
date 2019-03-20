import React, { Component } from 'react'
import { NavBar, Icon, WhiteSpace, Card, SegmentedControl, List, InputItem, Button, Tabs, WingBlank } from 'antd-mobile'
import './calculator.css';
export default class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            list1: ['按额度算', '按面积算'],
            list2: ['5', '10', '15', '20', '30'],
            list3: ['基准', '7折', '8折', '9折'],
            tabs: [
                { title: '公积金贷款' },
                { title: '商业贷款' },
                { title: '混合贷款' },
            ]
        }
    }
    componentDidMount() {
        const { text } = this.props.location.state.query.params
        this.setState({
            text
        })
    }
    onLeftClick = () => {
        const { history } = this.props
        history.goBack()
    }
    renderContent = (tab) =>
        (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', width: "100%" }}>
            <WingBlank size="sm" className={'calContent'}>
                <div className={'calRow'}>
                    <span className={'calLeft'} >贷款方式</span>
                    <span className={'calRight'} ><SegmentedControl values={this.state.list1} /></span>
                </div>
                <div className={'calRow'}>
                    <span className={'calLeft'} >贷款金额</span>
                    <span className={'calRight'} ><List>
                        <InputItem
                            // {...getFieldProps('preice')}
                            placeholder="0.00"
                            extra="¥"
                        ></InputItem>
                    </List></span>
                </div>
                <div className={'calRow'}>
                    <span className={'calLeft'} >贷款年限</span>
                    <span className={'calRight'} ><SegmentedControl values={this.state.list2} /></span>
                </div>
                <div className={'calRow'}>
                    <span className={'calLeft'} >贷款利率</span>
                    <span className={'calRight'} ><SegmentedControl values={this.state.list3} /></span>
                </div>
                <WhiteSpace size="sm" />
                <div className={'calBtn'} >
                    <Button type="primary">提交</Button>
                </div>

            </WingBlank>

        </div>);
    render() {
        return (
            <div>
                {/* 顶部标题及返回上一页 */}
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.onLeftClick}
                >{this.state.text}</NavBar>
                {/* 计算器主体 */}

                <Tabs tabs={this.state.tabs} useOnPan animated >
                    {this.renderContent}
                </Tabs>

            </div>
        )
    }
}

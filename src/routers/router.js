import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Login from '../components/login/login'
import Home from '../components/home/home'
import List from '../components/main/list';
export default class RouterCom extends Component {
    render() {
        return (
            <Router>
                <div>

                    {/* <Link exact to="/">Login</Link>
                    <Link exact to="/login">Login</Link> */}
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/login" component={Login}></Route>
                        <Route exact path="/list" component={List}></Route>
                        <Redirect exact to="/login" />
                        <Redirect exact to="/list" />
                    </Switch>
                </div>
            </Router>
        )
    }
}

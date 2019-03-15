import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Login from '../components/login/login'
import Home from '../components/home/home';
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
                        <Redirect to="/login" />
                    </Switch>
                </div>
            </Router>
        )
    }
}

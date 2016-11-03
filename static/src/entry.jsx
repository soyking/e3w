import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory, Router, Route, IndexRedirect } from 'react-router'
import App from './components/App'
import KeyValue from './components/KeyValue'
import Members from './components/Members'
import Roles from './components/Roles'
import Users from './components/Users'
import Setting from "./components/Setting"
import 'antd/dist/antd.min.css'
import './css/patch.css'

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="kv/" />
            <Route path="kv" component={KeyValue} />
            <Route path="kv/*" component={KeyValue} />
            <Route path="members" component={Members} />
            <Route path="roles" component={Roles} />
            <Route path="users" component={Users} />
            <Route path="setting" component={Setting} />
        </Route>
    </Router>
), document.querySelector(".root"))
import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory, Router, Route, IndexRedirect } from 'react-router'
import App from './components/App.jsx'
import KeyValue from './components/KeyValue.jsx'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="kv" />
      <Route path="kv" component={KeyValue} />
    </Route>
  </Router>
), document.querySelector(".root"))
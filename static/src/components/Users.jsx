import React from 'react'
import AuthPanel from './AuthPanel'
import { UsersAll, UsersPost } from './request'
import UsersSetting from './UsersSetting'

const Users = React.createClass({
    _getUsersDone(result) {
        this.setState({ users: result || [] })
    },

    _getUsers() {
        UsersAll(this._getUsersDone)
    },

    _createDone(result) {
        this._getUsers()
    },

    _create(name) {
        UsersPost(name, this._createDone)
    },

    componentDidMount() {
        this._getUsers()
    },

    componentWillReceiveProps(nextProps) {
        this._getUsers()
    },

    getInitialState() {
        return { users: [] }
    },

    _setting(name) {
        return <UsersSetting name={name}/>
    },

    render() {
        return (
            <AuthPanel title="USERS" items={this.state.users} create={this._create} setting={this._setting}/>
        )
    }
})

module.exports = Users
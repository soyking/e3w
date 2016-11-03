import React from 'react'
import AuthPanel from './AuthPanel'
import { UsersAll, UsersPost, UsersDelete } from './request'
import UsersSetting from './UsersSetting'

const Users = React.createClass({
    _getUsersDone(result) {
        this.setState({ users: result || [] })
    },

    _getUsers() {
        UsersAll(this._getUsersDone)
    },

    _createUserDone(result) {
        this._getUsers()
    },

    _createUser(name) {
        UsersPost(name, this._createUserDone)
    },

    _deleteUserDone(result) {
        this._getUsers()
    },

    _deleteUser(name) {
        UsersDelete(name, this._deleteUserDone)
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
            <AuthPanel title="USERS" items={this.state.users} create={this._createUser} setting={this._setting} delete={this._deleteUser}/>
        )
    }
})

module.exports = Users
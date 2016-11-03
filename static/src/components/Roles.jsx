import React from 'react'
import AuthPanel from './AuthPanel'
import { RolesAll, RolesPost } from './request'
import RolesSetting from './RolesSetting'

const Roles = React.createClass({
    _getRolesDone(result) {
        this.setState({ roles: result || [] })
    },

    _getRoles() {
        RolesAll(this._getRolesDone)
    },

    _createDone(result) {
        this._getRoles()
    },

    _create(name) {
        RolesPost(name, this._createDone)
    },

    componentDidMount() {
        this._getRoles()
    },

    componentWillReceiveProps(nextProps) {
        this._getRoles()
    },

    getInitialState() {
        return { roles: [] }
    },

    _setting(name) {
        return <RolesSetting name={name}/>
    },

    render() {
        return (
            <AuthPanel title="ROLES" items={this.state.roles} create={this._create} setting={this._setting}/>
        )
    }
})

module.exports = Roles
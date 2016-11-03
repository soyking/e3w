import React from 'react'
import AuthPanel from './AuthPanel'
import { RolesAll, RolesPost, RolesDelete } from './request'
import RolesSetting from './RolesSetting'

const Roles = React.createClass({
    _getRolesDone(result) {
        this.setState({ roles: result || [] })
    },

    _getRoles() {
        RolesAll(this._getRolesDone)
    },

    _createRoleDone(result) {
        this._getRoles()
    },

    _createRole(name) {
        RolesPost(name, this._createRoleDone)
    },

    _deleteRoleDone(result) {
        this._getRoles()
    },

    _deleteRole(name) {
        RolesDelete(name, this._deleteRoleDone)
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
        return <RolesSetting name={name} />
    },

    render() {
        return (
            <AuthPanel title="ROLES" items={this.state.roles} create={this._createRole} setting={this._setting} delete={this._deleteRole} />
        )
    }
})

module.exports = Roles
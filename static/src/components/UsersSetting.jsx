import React from 'react'
import { Box } from 'react-polymer-layout'
import { UsersGet, User, UsersGrantRole, UsersRovokeRole, UsersChangePassword, RolesAll } from './request'
import { Tag, Select, Button, Input } from 'antd'

const Option = Select.Option
const roleColors = ["blue", "green", "yellow", "red"]

const RoleItem = React.createClass({
    render() {
        let color = roleColors[(this.props.index || 0) % roleColors.length]
        return (
            <Box>
                <Tag closable color={color} onClose={this.props.delete}>
                    {this.props.name}
                </Tag>
            </Box>
        )
    }
})

const UsersSetting = React.createClass({
    _getUserDone(result) {
        this.setState({ roles: result || [] })
    },

    _getUser(props) {
        if (props.name) {
            UsersGet(props.name, this._getUserDone)
        }
    },

    _getAllRolesDone(result) {
        this.setState({ allRoles: result || [] })
    },

    _getAllRoles() {
        RolesAll(this._getAllRolesDone)
    },

    _enter(props) {
        this._getUser(props)
        this._getAllRoles()
        this.setState({ selectedRole: "", password: "" })
    },

    _refresh() {
        this._getUser(this.props)
    },

    _revokeRoleDone() {
        _refresh()
    },

    _revokeRole(role) {
        if (this.props.name && role) {
            UsersRovokeRole(this.props.name, role, this._revokeRoleDone)
        }
    },

    _grantRoleDone(result) {
        this._refresh()
    },

    _grantRole() {
        if (this.props.name && this.state.selectedRole) {
            UsersGrantRole(this.props.name, this.state.selectedRole, this._grantRoleDone)
        }
    },

    _selectRole(value) {
        this.setState({ selectedRole: value })
    },

    _changePassword() {
        UsersChangePassword(this.props.name, this.state.password, () => { })
    },

    componentDidMount() {
        this._enter(this.props)
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.name !== this.props.name) {
            this._enter(nextProps)
        }
    },

    getInitialState() {
        return { roles: [], allRoles: [], selectedRole: "", password: "" }
    },

    render() {
        let boxStyle = { padding: 10, fontSize: 16, fontWeight: 700 }
        let moduleStyle = Object.assign({}, boxStyle, { borderTop: "1px solid #ddd" })
        return (
            <Box vertical >
                <Box vertical style={boxStyle}>
                    ROLES
                    <Box wrap style={boxStyle}>
                        {
                            this.state.roles.map((r, index) => {
                                return <RoleItem key={r} name={r} delete={() => this._revokeRole(r) } index={index}/>
                            })
                        }
                    </Box>
                </Box>
                <Box vertical style={moduleStyle}>
                    GRANT
                    <Box justified style={boxStyle}>
                        <Select style={{ width: 120 }} size="large" onChange={this._selectRole} value={this.state.selectedRole}>
                            {
                                this.state.allRoles.map(r => {
                                    return <Option key={r} value={r}>{r}</Option>
                                })
                            }
                        </Select>
                        <Button size="large" type="primary" onClick={this._grantRole}>
                            CONFIRM
                        </Button>
                    </Box>
                </Box>
                <Box vertical style={moduleStyle}>
                    CHANGE PASSWORD
                    <Box justified style={boxStyle}>
                        <Input type="password" size="large" placeholder="New Password" value={this.state.password} onChange={
                            e => { this.setState({ password: e.target.value }) }
                        } />
                        <Button size="large" type="primary" onClick={this._changePassword}>
                            CONFIRM
                        </Button>
                    </Box>
                </Box>
            </Box>
        )
    }
})

module.exports = UsersSetting
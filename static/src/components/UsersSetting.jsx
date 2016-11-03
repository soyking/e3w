import React from 'react'
import { Box } from 'react-polymer-layout'
import { UsersGet, User, UsersRovokeRole } from './request'
import { Tag } from 'antd'

const roleColors = ["blue", "green", "yellow", "red"]

function pickOneColor() {
    return roleColors[Math.floor(Math.random() * roleColors.length)]
}

const RoleItem = React.createClass({
    render() {
        let color = pickOneColor()
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

    _revokeRoleDone() {
        _getUser(this.props)
    },

    _revokeRole(role) {
        if (this.props.name && role) {
            UsersRovokeRole(this.props.name, role, this._revokeRoleDone)
        }
    },

    componentDidMount() {
        this._getUser(this.props)
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.name !== this.props.name) {
            this._getUser(nextProps)
        }
    },

    getInitialState() {
        return { name: "", roles: [] }
    },

    render() {
        let boxStyle = { margin: 10, fontSize: 16, fontWeight: 700 }
        return (
            <Box vertical >
                <Box vertical style={boxStyle}>
                    ROLES
                    <Box wrap style={boxStyle}>
                        {
                            this.state.roles.map(r => {
                                return <RoleItem key={r} name={r} delete={() => this._revokeRole(r) }/>
                            })
                        }
                    </Box>
                </Box>
            </Box>
        )
    }
})

module.exports = UsersSetting
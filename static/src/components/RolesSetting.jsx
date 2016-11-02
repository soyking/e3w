import React from 'react'
import { Box } from 'react-polymer-layout'
import { RolesGet } from './request'

const RolesSetting = React.createClass({
    _getRoleDone(result) {
        this.setState({ perms: result || [] })
    },

    _getRole(props) {
        if (props.name) {
            RolesGet(props.name, this._getRoleDone)
        }
    },

    componentDidMount() {
        this._getRole(this.props)
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.name !== this.props.name) {
            this._getRole(nextProps)
        }
    },

    getInitialState() {
        return { name: "", perms: [] }
    },

    render() {
        return (
            <Box vertical >
                { this.state.perms.map(p => { return p.key }) }
            </Box>
        )
    }
})

module.exports = RolesSetting
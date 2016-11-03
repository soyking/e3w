import React from 'react'
import { Box } from 'react-polymer-layout'
import { UsersGet } from './request'

const UsersSetting = React.createClass({
    _getUserDone(result) {
        this.setState({ roles: result || [] })
    },

    _getUser(props) {
        if (props.name) {
            UsersGet(props.name, this._getUserDone)
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
        return (
            <Box vertical >
                {this.state.roles.map(r => { return r }) }
            </Box>
        )
    }
})

module.exports = UsersSetting
import React from 'react'
import AuthPanel from './AuthPanel'

const Roles = React.createClass({
    _getRoles() {
        return ["abc", "def"]
    },
    render() {
        return (
            <AuthPanel title="ROLES" getItems={this._getRoles}/>
        )
    }
})

module.exports = Roles
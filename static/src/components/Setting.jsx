import React from 'react'
import { Box } from 'react-polymer-layout'
import { Input } from 'antd'

const Setting = React.createClass({
    _loadSetting() {
        this.setState({ username: localStorage.etcdUsername, password: localStorage.etcdPassword })
    },

    _saveUsername(e) {
        let username = e.target.value
        this.setState({ username: username })
        localStorage.etcdUsername = username
    },

    _savePassword(e) {
        let password = e.target.value
        this.setState({ password: password })
        localStorage.etcdPassword = password
    },

    componentDidMount() {
        this._loadSetting()
    },

    componentWillReceiveProps(nextProps) {
        this._loadSetting()
    },

    getInitialState() {
        return { username: "", password: "" }
    },

    render() {
        let inputStyle = { margin: "10px 0px 10px" }
        let settingItemStyle = { width: 100, color: "#939393", fontSize: 14, fontWeight: 700 }
        return (
            <Box centerJustified >
                <Box vertical style={{ width: 780 }}>
                    <h3 style={{ fontSize: 18, margin: "20px 0px 15px" }}>Setting</h3>
                    <p style={{ fontSize: 16, marginBottom: 20 }}>Setting username and password for accessing etcd by Web UI.Everything is saved to localStorage.</p>
                    <Box style={inputStyle}>
                        <Box center style={settingItemStyle}>
                            USERNAME
                        </Box>
                        <Input size="large" value={this.state.username} onChange={ this._saveUsername }/>
                    </Box>
                    <Box style={inputStyle}>
                        <Box center style={settingItemStyle}>
                            PASSWORD
                        </Box>
                        <Input size="large" value={this.state.password} onChange={ this._savePassword }/>
                    </Box>
                </Box>
            </Box>
        )
    }
})

module.exports = Setting
import React from 'react'
import { Input, Button } from 'antd'
import { Box } from 'react-polymer-layout'
import { KVGet, KVPut, KVDelete } from './request'
import { message } from 'antd'

const KeyValueSetting = React.createClass({
    _getDone(result) {
        this.setState({ value: result.value })
    },

    _get(key) {
        KVGet(key || this.props.currentKey, this._getDone)
    },

    _updateDone(result) {
        message.info("update successfully.")
    },

    _update() {
        KVPut(this.props.currentKey, this.state.value, this._updateDone)
    },

    // _deleteDone(result) {
    //     this.props.back()
    // },

    // _deleteDir() {
    //     KVDelete(this.state.dir, this._deleteDone)
    // },

    getInitialState() {
        return { value: "" }
    },

    _fetch(key) {
        this.setState({ value: "" })
        this._get(key)
    },

    componentDidMount() {
        this._fetch()
    },

    componentWillReceiveProps(nextProps) {
        this._fetch(nextProps.currentKey)
    },

    render() {
        return (
            <Box vertical>
                {this.props.currentKey}
                <Input type="textarea" rows={4} value={this.state.value} onChange={e => this.setState({ value: e.target.value })} />
                <Box>
                    <Button type="primary" onClick={this._update} >Update</Button>
                    {
                        <Button type="ghost" onClick={this._deleteDir} >Delete Dir</Button>
                    }
                </Box>
            </Box>
        )
    }
})

module.exports = KeyValueSetting
import React from 'react'
import { Input, Button } from 'antd'
import { Box } from 'react-polymer-layout'
import { message } from 'antd'
import { KVGet, KVPut, KVDelete } from './request'
import { DeleteButton } from './utils'

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

    _deleteDone(result) {
        this.props.delete()
    },

    _delete() {
        KVDelete(this.props.currentKey, this._deleteDone)
    },

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
        if (this.props.currentKey !== nextProps.currentKey) {
            this._fetch(nextProps.currentKey)
        }
    },

    render() {
        return (
            <Box vertical style={{ padding: "10px 7px 0px 7px" }}>
                <div style={{ width: "100%", paddingTop: 10 }}>
                    <Input type="textarea" rows={4} value={this.state.value} onChange={e => this.setState({ value: e.target.value }) } />
                </div>
                <Box justified>
                    <div className="kv-create-button" ><Button size="large" type="primary" onClick={this._update} >UPDATE</Button></div>
                    <div className="kv-create-button" style={{ paddingRight: 0 }}>
                        <DeleteButton name="DELETE KEY" delete={this._delete} />
                    </div>
                </Box>
            </Box >
        )
    }
})

module.exports = KeyValueSetting
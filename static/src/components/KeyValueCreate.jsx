import React from 'react'
import { Input, Button } from 'antd'
import { Box } from 'react-polymer-layout'
import { KVPut, KVDelete } from './request'

const KeyValueCreate = React.createClass({
    _createDone(result) {
        this.setState({ key: "", value: "" })
        this.props.update()
    },

    _createKey(e) {
        KVPut(this.state.dir + "/" + this.state.key, this.state.value, this._createDone)
    },

    _createDir(e) {
        KVPut(this.state.dir + "/" + this.state.key + "?dir", null, this._createDone)
    },

    _deleteDone(result) {
        this.props.back()
    },

    _deleteDir() {
        KVDelete(this.state.dir, this._deleteDone)
    },

    getInitialState() {
        return { dir: "", key: "", value: "" }
    },

    _updateDir() {
        this.setState({ dir: this.props.dir })
    },

    componetDidMount() {
        this._updateDir()
    },

    componentWillReceiveProps() {
        this._updateDir()
    },

    render() {
        let canClick = this.state.key !== ""
        return (
            <Box vertical>
                <Box>
                    Key: <Input addonBefore={this.state.dir} placeholder="dir / key name" value={this.state.key} onChange={e => this.setState({ key: e.target.value })} />
                </Box>
                <Box>
                    Value: <Input type="textarea" rows={4} value={this.state.value} onChange={e => this.setState({ value: e.target.value })} />
                </Box>
                <Box>
                    {
                        canClick ?
                            (
                                <div>
                                    <Button type="primary" onClick={this._createKey} >Create Key</Button>
                                    <Button type="primary" onClick={this._createDir} >Create Dir</Button>
                                </div>
                            ) :
                            (
                                <div>
                                    <Button type="primary" onClick={this._createKey} disabled >Create Key</Button>
                                    <Button type="primary" onClick={this._createDir} disabled>Create Dir</Button>
                                </div>
                            )
                    }
                    {
                        this.state.dir === "/" ? null : (<Button type="ghost" onClick={this._deleteDir} >Delete Dir</Button>)
                    }
                </Box>
            </Box>
        )
    }
})

module.exports = KeyValueCreate
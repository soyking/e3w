import React from 'react'
import { Box } from 'react-polymer-layout'
import { Breadcrumb } from 'antd'
import { KVList } from './request'
import KeyValueCreate from './KeyValueCreate'
import KeyValueItem from './KeyValueItem'

const KeyValue = React.createClass({
    // states:
    // - dir: the full path of current dir, show on the top
    // - menus: components of Breadcrumb, including path (to another dir, using in url hash) and name
    // - list: the key under the dir, get from api

    _parseList(list) {
        list = list || []
        // trim prefix of dir, get the relative path
        let prefixLen = this.state.dir.length
        list.forEach(l => {
            l.key = l.key.slice(prefixLen)
        })
        this.setState({ list: list })
    },

    // dir should be / for /abc/def
    _parseKey(dir) {
        let menus = [{ path: "/", name: "root" }]
        if (dir !== "/") {
            let keys = dir.split("/")
            for (let i = 1; i < keys.length; i++) {
                // get the full path of every component
                menus.push({ path: keys.slice(0, i + 1).join("/"), name: keys[i] })
            }
            if (!dir.endsWith("/")) { dir = dir + "/" }
        }
        KVList(dir, this._parseList)
        return { dir: dir, menus: menus }
    },

    _fetch(dir) {
        this.setState(this._parseKey(dir))
    },

    _changeMenu(dir) {
        window.location.hash = "#kv" + dir
        this._fetch(dir)
    },

    _enter(subKey) {
        let dir = this.state.dir + subKey
        window.location.hash = "#kv" + dir
        this._fetch(dir)
    },

    _update() {
        this._fetch(this.state.dir)
    },

    componentDidMount() {
        this._fetch("/" + (this.props.params.splat || ""))
    },

    getInitialState() {
        return { dir: "", menus: [], list: [] }
    },

    render() {
        return (
            <Box style={{ padding: 20 }}>
                <Box vertical style={{ minWidth: 400 }}>
                    <Breadcrumb>
                        {
                            this.state.menus.map(
                                m => (<Breadcrumb.Item key={m.path} onClick={() => this._changeMenu(m.path) }><a>{m.name}</a></Breadcrumb.Item>)
                            )
                        }
                    </Breadcrumb>
                    <Box vertical>
                        {
                            this.state.list.map(
                                l => (<KeyValueItem key={l.key} enter={this._enter} info={l} />)
                            )
                        }
                    </Box>
                </Box>
                <KeyValueCreate update={this._update} dir={this.state.dir}/>
            </Box>
        )
    }
})

module.exports = KeyValue
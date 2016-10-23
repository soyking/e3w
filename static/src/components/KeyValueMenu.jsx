import React from 'react'
import { Box } from 'react-polymer-layout'
import { Breadcrumb, Icon } from 'antd'
import xhr from 'xhr'
import { KVList } from './request'

const KeyValueMenuItem = React.createClass({
    _enter() {
        let info = this.props.info
        if (info.is_dir) {
            this.props.enter(info.key)
        } else {
            // TODO: fetch value and show
        }
    },

    render() {
        let info = this.props.info
        let icon = info.is_dir ? <Icon type="folder" /> : (<Icon type="file" />)
        return (
            <Box center>
                <div onClick={this._enter}>
                    {icon}{info.key}
                </div>
            </Box>
        )
    }
})

const KeyValueMenu = React.createClass({
    _parseList(result) {
        if (result) {
            result = result || []
            let prefixLen = this.state.key.length
            result.forEach(l => {
                l.key = l.key.slice(prefixLen).trim("/")
            })
            this.setState({ list: result })
        }
    },

    _parseKey(key) {
        let menus = [{ path: "", menu: "root" }]
        if (key) {
            let keys = key.split("/")
            for (let i = 0; i < keys.length; i++) {
                menus.push({ path: keys.slice(0, i + 1).join("/"), menu: keys[i] })
            }
            console.log(menus)
        } else {
            key = ""
        }
        KVList(key, this._parseList)
        return { key: key, menus: menus }
    },

    getInitialState() {
        return Object.assign(this._parseKey(this.props.currentKey), { list: [] })
    },

    _changeMenu(path) {
        window.location.hash = "#kv/" + path
        this.setState(this._parseKey(path))
    },

    _enter(subKey) {
        let key = this.state.key ? this.state.key + "/" + subKey : subKey
        console.log(key)
        window.location.hash = "#kv/" + key
        this.setState(this._parseKey(key))
    },

    render() {
        return (
            <Box vertical style={{ padding: 20, width: 400 }}>
                <Breadcrumb>
                    {
                        this.state.menus.map(m => (<Breadcrumb.Item key={m.path} onClick={() => this._changeMenu(m.path) }><a>{m.menu}</a></Breadcrumb.Item>))
                    }
                </Breadcrumb>
                <Box vertical>
                    {
                        this.state.list.map(l => (<KeyValueMenuItem key={l.key} enter={this._enter} info={l} />))
                    }
                </Box>
            </Box>
        )
    }
})

module.exports = KeyValueMenu
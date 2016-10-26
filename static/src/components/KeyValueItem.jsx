import React from 'react'
import { Box } from 'react-polymer-layout'
import { Icon } from 'antd'

const KeyValueItem = React.createClass({
    _enter() {
        let info = this.props.info
        if (info.is_dir) {
            this.props.enter(info.key)
        } else {
            this.props.set(info.key)
        }
    },

    render() {
        let info = this.props.info
        let icon = info.is_dir ? <Icon type="folder" /> : (<Icon type="file" />)
        let bColor = info.selected ? "#5bccff" : "#ddd"
        return (
            <Box center style={{
                borderStyle: "solid", borderWidth: 2, borderColor: bColor,
                height: 40, margin: "4px 10px 4px 0px", fontSize: 15, fontWeight: 700
            }} onClick={this._enter}>
                <Box center centerJustified style={{
                    backgroundColor: bColor,
                    height: "100%",
                    width: 30,
                }}>{icon}</Box>
                <Box style={{ paddingLeft: 5 }}>{info.key}</Box>
            </Box>
        )
    }
})

module.exports = KeyValueItem
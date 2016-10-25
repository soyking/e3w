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
        let itemStyle = {
            borderStyle: "solid", borderWidth: 2,
            height: 40, margin: "4px 10px 4px 0px", fontSize: 15, fontWeight: 700
        }
        itemStyle.borderColor = info.selected ? "#2db7f5" : "#ddd"
        return (
            <Box center style={itemStyle} onClick={this._enter}>
                <Box center centerJustified style={{
                    backgroundColor: itemStyle.borderColor,
                    height: "100%",
                    width: 30,
                }}>{icon}</Box>
                <Box style={{ paddingLeft: 5 }}>{info.key}</Box>
            </Box>
        )
    }
})

module.exports = KeyValueItem
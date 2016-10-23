import React from 'react'
import { Box } from 'react-polymer-layout'
import { Icon } from 'antd'

const KeyValueItem = React.createClass({
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

module.exports = KeyValueItem
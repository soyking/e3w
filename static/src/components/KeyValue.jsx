import React from 'react'
import { Box, Item } from "react-polymer-layout"
import KeyValueMenu from './KeyValueMenu'
import KeyValueSetting from './KeyValueSetting'

const KeyValue = React.createClass({
    render() {
        let key = this.props.params.splat
        return (
            <Box>
                <KeyValueMenu currentKey={key} />
                <Item flex><KeyValueSetting /></Item>
            </Box>
        )
    }
})

module.exports = KeyValue
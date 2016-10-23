import React from 'react'
import { Box } from 'react-polymer-layout'
import { Breadcrumb } from 'antd'

const KeyValueMenu = React.createClass({
    render() {
        let key = this.props.currentKey
        return (
            <Box vertical style={{ padding:20, minWidth:400 }}>
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>应用中心</Breadcrumb.Item>
                    <Breadcrumb.Item>应用列表</Breadcrumb.Item>
                    <Breadcrumb.Item>某应用</Breadcrumb.Item>
                </Breadcrumb>
            </Box>
        )
    }
})

module.exports = KeyValueMenu
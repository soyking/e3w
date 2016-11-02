import React from 'react'
import { Popconfirm, Button } from 'antd'
import { Box } from 'react-polymer-layout'

const DeleteButton = React.createClass({
    render() {
        return (
            <Popconfirm title="Sure to delete?" okText="Yes" cancelText="No" onConfirm={this.props.delete}>
                <Button size="large" type="ghost">{this.props.name || "DELETE"}</Button>
            </Popconfirm>
        )
    }
})

const CommonPanel = React.createClass({
    render() {
        let bColor = this.props.color ? this.props.color : "#ddd"
        return (
            <Box vertical style={{ border: "2px solid", borderRadius: 4, width: "100%", borderColor: bColor }}>
                <div style={{ height: 20, backgroundColor: bColor }}></div>
                <Box center style={{ height: 50, fontSize: 20, fontWeight: 500, borderBottom: "1px solid #ddd", paddingLeft: 10 }}>
                    {this.props.hint || ""}
                </Box>
                {this.props.children}
            </Box >
        )
    }
})

module.exports = { DeleteButton, CommonPanel }
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
            <Box start flex style={{ paddingLeft: 20, borderLeft: "1px #E6E6E6 solid" }}>
                <Box vertical style={{ border: "2px solid", borderRadius: 4, width: "100%", borderColor: bColor }}>
                    <div style={{ height: 20, backgroundColor: bColor }}></div>
                    <Box justified center style={{ height: 50, fontSize: 20, fontWeight: 500, borderBottom: "1px solid #ddd", paddingLeft: 10, paddingRight: 10 }}>
                        <Box center>
                            {this.props.hint || ""}
                        </Box>
                        {this.props.withDelete ? <DeleteButton delete={this.props.delete} /> : null}
                    </Box>
                    {this.props.children}
                </Box >
            </Box>
        )
    }
})

module.exports = { DeleteButton, CommonPanel }
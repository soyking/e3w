import React from 'react'
import { Popconfirm, Button } from 'antd'

const DeleteButton = React.createClass({
    render() {
        return (
            <Popconfirm title="Sure to delete?" okText="Yes" cancelText="No" onConfirm={this.props.delete}>
                <Button size="large" type="ghost">{this.props.name || "DELETE"}</Button>
            </Popconfirm>
        )
    }
})

module.exports = { DeleteButton }
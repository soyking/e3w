import React from 'react'
import { Menu, Icon } from 'antd'
import { Box } from 'react-polymer-layout'

const App = React.createClass({
    getInitialState() {
        return {
            current: 'kv',
        }
    },
    handleClick(e) {
        this.setState({
            current: e.key,
        })
        window.location.hash = "#" + e.key
    },
    render() {
        return (
            <Box centerJustified>
                <Box vertical style={{ width: 1000 }}>
                    <Box style={{ padding: 20, borderBottom: "1px #E6E6E6 solid" }}>
                        <Menu onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                            >
                            <Menu.Item key="kv">
                                <Icon type="menu-fold" />KEY/VALUE
                            </Menu.Item>
                        </Menu>
                    </Box>
                    <div style={{ paddingTop: 20 }}>
                        {this.props.children}
                    </div>
                </Box>
            </Box>
        );
    },
})

module.exports = App
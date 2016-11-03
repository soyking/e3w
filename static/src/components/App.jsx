import React from 'react'
import { Menu, MenuItemGroup, Icon } from 'antd'
import { Box } from 'react-polymer-layout'

const App = React.createClass({
    getInitialState() {
        return { menu: "" }
    },

    _getMenu() {
        let parts = window.location.hash.split("/")
        let menu = "kv"
        if (parts.length > 1) {
            // cut ?_k=hash
            menu = parts[1].split("?")[0]
        }
        return menu
    },

    _changeMenu() {
        this.setState({ menu: this._getMenu() })
    },

    componentDidMount() {
        this._changeMenu()
    },

    componentWillReceiveProps(nextProps) {
        if (this.state.menu !== this._getMenu()) {
            this._changeMenu()
        }
    },

    handleClick(e) {
        window.location.hash = "#" + e.key
    },

    render() {
        return (
            <Box centerJustified>
                <Box vertical style={{ width: 1000 }}>
                    <Box style={{ padding: 20, borderBottom: "1px #E6E6E6 solid" }}>
                        <Box center ceterJustified onClick={() => { window.location.hash = "#/" } }
                            style={{
                                fontSize: 25, fontWeight: 700, marginRight: 20, paddingRight: 20,
                                borderStyle: "solid", borderWidth: "0px 2px 0px 0px", borderColor: "#ddd",
                                cursor: "pointer"
                            }}>
                            E·3·W
                        </Box>
                        <Menu onClick={this.handleClick}
                            selectedKeys={[this.state.menu]}
                            mode="horizontal"
                            style={{ fontWeight: 700, fontSize: 14 }}
                            >
                            <Menu.Item key="kv">
                                <Icon type="menu-fold" /><span>KEY / VALUE</span>
                            </Menu.Item>
                            <Menu.Item key="members">
                                <Icon type="tags" /><span>MEMBERS</span>
                            </Menu.Item>
                            <Menu.SubMenu key="auth" title={<span><Icon type="team" />AUTH</span>}>
                                <Menu.Item key="roles">ROLES</Menu.Item>
                                <Menu.Item key="users">USERS</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item key="setting">
                                <Icon type="setting" /><span>SETTING</span>
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
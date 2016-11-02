import React from 'react'
import { Box } from 'react-polymer-layout'
import { Input, Button } from 'antd'
import { CommonPanel } from './utils'

const AuthItem = React.createClass({
    render() {
        let item = this.props.item
        let bColor = item.selected ? "#95ccf5" : "#c3c3c3"
        return (
            <Box center style={{
                borderStyle: "solid", borderWidth: 2, borderColor: bColor, borderRadius: 4,
                height: 40, margin: "0px 10px 8px 0px", fontSize: 15, fontWeight: 700, cursor: "pointer",
            }} onClick={this.props.click || null}>
                <div style={{
                    backgroundColor: bColor,
                    height: "100%",
                    width: 30
                }}></div>
                <Box style={{ paddingLeft: 5 }}>{item.name || ""}</Box>
            </Box>
        )
    }
})

const AuthCreate = React.createClass({
    _clean() {
        this.setState({ name: "" })
    },

    componentDidMount() {
        this._clean()
    },

    componentWillReceiveProps(nextProps) {
        this._clean()
    },

    getInitialState() {
        return { name: "" }
    },

    render() {
        return (
            <Box vertical style={{ padding: "10px 7px 0px 7px" }}>
                <div style={{ width: "100%", paddingTop: 10 }}>
                    <Input size="large" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                </div>
                <Box endJustified>
                    <div style={{ "padding": "15px 0px 15px" }}>
                        <Button type="primary" size="large" onClick={() => this.props.create(this.state.name)} disabled={this.state.name === ""} > CREATE </Button>
                    </div>
                </Box>
            </Box>
        )
    }
})

const AuthPanel = React.createClass({
    _prepareItems(props) {
        let rawItems = props.items || []
        let items = []
        rawItems.forEach(i => { items.push({ name: i, selected: false }) })
        this.setState({ items: items })
    },

    _selectItem(name) {
        let items = this.state.items
        let unset = false
        items.forEach(i => {
            if (i.name === name) {
                if (i.selected) {
                    unset = true
                }
                i.selected = !i.selected
            }
            else {
                i.selected = false
            }
        })
        this.setState({ items: items, selectedItem: unset ? "" : name })
    },

    _createItem(name) {
        this.props.create(name)
    },

    _deleteItem() {
        this.props.delete(this.state.selectedItem)
        this.setState({ selectedItem: "" })
    },

    componentDidMount() {
        this._prepareItems(this.props)
    },

    componentWillReceiveProps(nextProps) {
        this._prepareItems(nextProps)
    },

    getInitialState() {
        return { items: [], selectedItem: "" }
    },

    render() {
        let title = this.props.title || ""
        let panelHint = "CREATE " + title
        let sidePanel = null
        let withDelete = false
        if (this.state.selectedItem) {
            if (this.props.setting) {
                sidePanel = this.props.setting(this.state.selectedItem)
                panelHint = "SETTING"
                withDelete = true
            }
        } else {
            sidePanel = <AuthCreate create={this._createItem} />
        }
        return (
            <Box vertical>
                <div style={{
                    height: 42,
                    fontSize: 18,
                    fontWeight: 700
                }}>
                    {this.props.title || ""}
                </div>
                <Box>
                    <Box vertical style={{
                        width: 400,
                        paddingRight: 20
                    }}>
                        {
                            this.state.items.map(
                                i => (<AuthItem key={i.name} click={() => this._selectItem(i.name)} item={i} />)
                            )
                        }
                    </Box>
                    <CommonPanel hint={panelHint} withDelete={withDelete} delete={this._deleteItem}>
                        {sidePanel}
                    </CommonPanel>
                </Box>
            </Box >
        )
    }
})

module.exports = AuthPanel
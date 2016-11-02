import React from 'react'
import { Box } from 'react-polymer-layout'

const AuthItem = React.createClass({
    render() {
        let item = this.props.item
        let bColor = item.selected ? "#95ccf5" : "#c3c3c3"
        return (
            <Box center style={{
                borderStyle: "solid", borderWidth: 2, borderColor: bColor, borderRadius: 4,
                height: 40, margin: "0px 10px 8px 0px", fontSize: 15, fontWeight: 700, cursor: "pointer",
            }} onClick={ this.props.click || null }>
                <div style={{
                    backgroundColor: bColor,
                    height: "100%",
                    width: 30
                }}></div>
                <Box style={{ paddingLeft: 5 }}>{ item.name || "" }</Box>
            </Box>
        )
    }
})

const AuthPanel = React.createClass({
    _fetchItems() {
        let rawItems = this.props.getItems && this.props.getItems() || []
        let items = []
        rawItems.forEach(i => { items.push({ name: i, key: Math.random(), selected: false }) })
        this.setState({ items: items })
    },

    _selectItem(key) {
        let items = this.state.items
        items.forEach(i => { if (i.key === key) { i.selected = !i.selected } else { i.selected = false } })
        this.setState({ items: items, selectedItem: key })
    },

    componentDidMount() {
        this._fetchItems()
    },

    componentWillReceiveProps(nextProps) {
        this._fetchItems()
    },

    getInitialState() {
        return { items: [], selectedItem: "" }
    },

    render() {
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
                                i => (<AuthItem key={ i.key } click={ () => this._selectItem(i.key) } item={i} />)
                            )
                        }
                    </Box>
                </Box>
            </Box>
        )
    }
})

module.exports = AuthPanel
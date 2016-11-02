import React from 'react'
import { Box } from 'react-polymer-layout'
import { Input, Button } from 'antd'

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
        let hint = "CREATE " + (this.props.name || "")
        return (
            <Box vertical style={{ border: "2px solid", borderRadius: 4, width: "100%", borderColor: "#ddd" }}>
                <div style={{ height: 20, backgroundColor: "#ddd" }}></div>
                <Box center style={{ height: 50, fontSize: 20, fontWeight: 500, borderBottom: "1px solid #ddd", paddingLeft: 10 }}>
                    {hint}
                </Box>
                <Box vertical style={{ padding: "10px 7px 0px 7px" }}>
                    <div style={{ width: "100%", paddingTop: 10 }}>
                        <Input size="large" value={this.state.name} onChange={e => this.setState({ name: e.target.value }) } />
                    </div>
                    <Box endJustified>
                        <div style={{ "padding": "15px 0px 15px" }}>
                            <Button type="primary" size="large" onClick={() => this.props.create(this.state.name) } disabled={this.state.name === ""} > {hint}</Button>
                        </div>
                    </Box>
                </Box>
            </Box >
        )
    }
})

const AuthPanel = React.createClass({
    _prepareItems(props) {
        let rawItems = props.items || []
        let items = []
        rawItems.forEach(i => { items.push({ name: i, key: Math.random(), selected: false }) })
        this.setState({ items: items })
    },

    _selectItem(key) {
        let items = this.state.items
        items.forEach(i => { if (i.key === key) { i.selected = !i.selected } else { i.selected = false } })
        this.setState({ items: items, selectedItem: key })
    },

    _create(name) {
        this.props.create(name)
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
                    <Box start flex style={{ paddingLeft: 20, borderLeft: "1px #E6E6E6 solid" }}>
                        <AuthCreate name={title} create={this._create}/>
                    </Box>
                </Box>
            </Box>
        )
    }
})

module.exports = AuthPanel
import React from 'react'
import { Box } from 'react-polymer-layout'
import { RolesGet, RolesAddPerm, RolesDeletePerm } from './request'
import { Radio, Input, Button, Tooltip, Icon } from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const PermTypes = ["READWRITE", "READ", "WRITE"]
const KeyTypes = ["RANGE", "PREFIX"]

const PermItem = React.createClass({
    render() {
        let perm = this.props.perm
        let typeColor = "#ccc"
        switch (perm.perm_type) {
            case "READWRITE":
                typeColor = "#f60"
                break
            case "READ":
                typeColor = "#5fbc29"
                break
            case "WRITE":
                typeColor = "#01b3ca"
                break
        }
        return (
            <Box center>
                <Box flex style={{
                    height: 40,
                    borderStyle: "solid", borderWidth: 2, borderColor: "#ddd", borderRadius: 8,
                    fontWeight: 700, fontSize: 16
                }}>
                    <Box center centerJustified style={{ backgroundColor: typeColor, height: "100%", width: 120, borderRadius: "6px 0px 0px 6px" }}>
                        {perm.perm_type}
                    </Box>
                    <Tooltip title="KEY">
                        <Box center centerJustified flex style={{ borderRight: "1px solid #ddd" }}>
                            {perm.key}
                        </Box>
                    </Tooltip>
                    <Tooltip title="RANGE END">
                        <Box center centerJustified flex>
                            {perm.range_end}
                        </Box>
                    </Tooltip>
                </Box>
                <Box center centerJustified style={{
                    color: "red", width: 40, fontSize: 20, cursor: "pointer"
                }} onClick={this.props.delete}><Icon type="lock" /></Box>
            </Box>
        )
    }
})

const RolesSetting = React.createClass({
    _getRoleDone(result) {
        this.setState({ perms: result || [] })
    },

    _getRole(props) {
        if (props.name) {
            RolesGet(props.name, this._getRoleDone)
        }
    },

    _selectPermType(e) {
        this.setState({ permType: e.target.value })
    },

    _selectKeyType(e) {
        this.setState({ keyType: e.target.value })
    },

    _addPermDone(result) {
        this._getRole(this.props)
    },

    _addPerm() {
        let state = this.state
        RolesAddPerm(this.props.name, state.permType, state.key, state.rangeEnd, state.keyType === "PREFIX", this._addPermDone)
    },

    _deletePermDone() {
        this._getRole(this.props)
    },

    _deletePerm(p) {
        RolesDeletePerm(this.props.name, p.key, p.range_end, this._deletePermDone)
    },

    componentDidMount() {
        this._getRole(this.props)
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.name !== this.props.name) {
            this._getRole(nextProps)
        }
    },

    getInitialState() {
        return { name: "", perms: [], permType: PermTypes[0], keyType: KeyTypes[0], key: "", rangeEnd: "" }
    },

    render() {
        let radioStyle = { padding: "5px 0px 5px 0px" }
        let typeStyle = { width: 120, paddingLeft: 3 }
        let cantClick = this.state.key === ""
        return (
            <Box vertical >
                <Box vertical style={{ padding: 10, width: "100%" }}>
                    {this.state.perms.map(p => {
                        return <div style={radioStyle} key={Math.random() }> <PermItem perm={p} delete={() => { this._deletePerm(p) } }/></div>
                    }) }
                </Box>
                <Box style={{ borderTop: "1px solid #ddd", fontWeight: 700, fontSize: 16 }}>
                    <Box vertical style={{ margin: 12, width: "100%" }}>
                        <Box style={radioStyle}>
                            <Box center style={typeStyle}>Perm Type</Box>
                            <RadioGroup onChange={this._selectPermType} defaultValue={PermTypes[0]}>
                                {PermTypes.map(t => { return (<RadioButton key={t} size="large" value={t}>{t}</RadioButton>) }) }
                            </RadioGroup>
                        </Box>
                        <Box style={radioStyle}>
                            <div style={typeStyle}>Key Type</div>
                            <RadioGroup onChange={this._selectKeyType} defaultValue={KeyTypes[0]}>
                                {KeyTypes.map(t => { return (<RadioButton key={t} size="large" value={t}>{t}</RadioButton>) }) }
                            </RadioGroup>
                        </Box>
                        <Box style={radioStyle} >
                            <Box center style={typeStyle}>Key</Box>
                            <Input size="large" key="key" value={this.state.key} onChange={e => this.setState({ key: e.target.value }) } />
                        </Box>
                        <Box style={radioStyle}>
                            <Box center style={typeStyle}>RangeEnd</Box>
                            <Input size="large" key="rangeEnd" value={this.state.rangeEnd} onChange={e => this.setState({ rangeEnd: e.target.value }) } />
                        </Box>
                        <Box endJustified style={radioStyle} >
                            <Button type="primary" size="large" onClick={this._addPerm} disabled={cantClick} >
                                ADD PERM
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
})

module.exports = RolesSetting
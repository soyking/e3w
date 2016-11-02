import React from 'react'
import { Box } from 'react-polymer-layout'
import { RolesGet, RolesAddPerm } from './request'
import { Radio, Input, Button } from 'antd'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const PermTypes = ["READWRITE", "READ", "WRITE"]
const KeyTypes = ["RANGE", "PREFIX"]

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
        let typeStyle = { width: 80, fontSize: 13 }
        let cantClick = this.state.key === ""
        return (
            <Box vertical >
                {this.state.perms.map(p => { return p.key })}
                <Box style={{ borderTop: "1px solid #ddd" }}>
                    <Box vertical style={{ margin: 10, width: "100%" }}>
                        <Box style={radioStyle}>
                            <Box center style={typeStyle}>Perm Type</Box>
                            <RadioGroup onChange={this._selectPermType} defaultValue={PermTypes[0]}>
                                {PermTypes.map(t => { return (<RadioButton key={t} size="large" value={t}>{t}</RadioButton>) })}
                            </RadioGroup>
                        </Box>
                        <Box style={radioStyle}>
                            <div style={typeStyle}>Key Type</div>
                            <RadioGroup onChange={this._selectKeyType} defaultValue={KeyTypes[0]}>
                                {KeyTypes.map(t => { return (<RadioButton key={t} size="large" value={t}>{t}</RadioButton>) })}
                            </RadioGroup>
                        </Box>
                        <Box style={radioStyle} >
                            <Box center style={typeStyle}>From</Box>
                            <Input size="large" key="key" value={this.state.key} onChange={e => this.setState({ key: e.target.value })} />
                        </Box>
                        <Box style={radioStyle}>
                            <Box center style={typeStyle}>To</Box>
                            <Input size="large" key="rangeEnd" value={this.state.rangeEnd} onChange={e => this.setState({ rangeEnd: e.target.value })} />
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
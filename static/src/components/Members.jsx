import React from 'react'
import { Box } from 'react-polymer-layout'
import { MembersGet } from './request'
import { Icon } from 'antd'

const Member = React.createClass({
    render() {
        let member = this.props.member
        let size = 100
        let healthy = member.status === "healthy"
        let mainColor = healthy ? "#60be29" : "#ff6100"
        let targetStyle = { fontWeight: 700 }
        let roleColor = member.role === "leader" ? "#8867d2" : "#ccc"
        return (
            <Box center style={{ margin: "20px 0px 20px 0px" }}>
                <Box center centerJustified
                    style={{
                        width: size, height: size, borderRadius: size / 2, borderStyle: "solid", borderWidth: 3, borderColor: "#ddd",
                        backgroundColor: mainColor,
                        fontSize: 18
                    }}>
                    {member.name}
                </Box>
                <Box flex
                    style={{
                        width: "100%", height: size, marginLeft: -size / 2, zIndex: -1,
                        borderStyle: "solid", borderWidth: 3, borderColor: "#ddd"
                    }}>
                    <Box flex vertical style={{ margin: "10px 0px 10px 100px", fontSize: 18 }}>
                        <Box flex>
                            <Box justified style={{ width: 90, marginRight: 50 }}>
                                <div style={targetStyle}>Status</div>
                                <div>
                                    {
                                        healthy ?
                                            <div style={{ color: "green" }}><Icon type="check-circle" /></div> :
                                            <div style={{ color: "red" }}><Icon type="minus-circle-o" /></div>
                                    }
                                </div>
                            </Box>
                            <Box justified style={{ width: 190 }}>
                                <div style={targetStyle}>DB Size</div>
                                { member.db_size} Bytes
                            </Box>
                        </Box>
                        <Box flex justified style={{ width: 320 }}>
                            <div style={targetStyle}>PeerURLs</div>
                            <div>{member.peerURLs}</div>
                        </Box>
                    </Box>
                    <Box center centerJustified style={{ width: 130, backgroundColor: roleColor, fontSize: 18, color: "black", fontWeight: 700 }}>
                        {member.role.toUpperCase() }
                    </Box>
                </Box>
            </Box >
        )
    }
})

const Members = React.createClass({
    _getDone(result) {
        this.setState({ members: result })
    },

    _get() {
        MembersGet(this._getDone)
    },

    getInitialState() {
        return { members: [] }
    },

    componentDidMount() {
        this._get()
    },

    componentWillReceiveProps(nextProps) {
        this._get()
    },

    render() {
        return (
            <Box centerJustified>
                <Box vertical style={{ width: 780 }}>
                    {
                        this.state.members.map(m => {
                            return <Member key={m.ID} member={m} />
                        })
                    }
                </Box>
            </Box >
        )
    }
})

module.exports = Members
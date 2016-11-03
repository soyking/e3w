import xhr from 'xhr'
import { message } from 'antd'

function handler(callback) {
    return function (err, response) {
        if (err) {
            message.error(err);
        } else {
            if (response && response.body) {
                let resp = JSON.parse(response.body)
                if (resp.err) {
                    message.error(resp.err)
                } else if (callback) {
                    callback(resp.result)
                }
            }
        }
    }
}

function KVList(path, callback) {
    xhr.get("kv" + path + "?list", handler(callback))
}

function KVGet(path, callback) {
    xhr.get("kv" + path, handler(callback))
}

function KVPost(path, value, callback) {
    let bodyStr = JSON.stringify({ value: value })
    xhr.post("kv" + path, { body: bodyStr }, handler(callback))
}

function KVPut(path, value, callback) {
    let bodyStr = JSON.stringify({ value: value })
    xhr.put("kv" + path, { body: bodyStr }, handler(callback))
}

function KVDelete(path, callback) {
    xhr.del("kv" + path, null, handler(callback))
}

function MembersGet(callback) {
    xhr.get("members", handler(callback))
}

function RolesAll(callback) {
    xhr.get("roles", handler(callback))
}

function RolesPost(name, callback) {
    let bodyStr = JSON.stringify({ name: name })
    xhr.post("role", { body: bodyStr }, handler(callback))
}

function RolesGet(name, callback) {
    xhr.get("role/" + name, handler(callback))
}

function RolesAddPerm(name, permType, key, rangeEnd, prefix, callback) {
    let bodyStr = JSON.stringify({ perm_type: permType, key: key, range_end: rangeEnd })
    xhr.post("role/" + name + "/permission" + (prefix ? "?prefix" : ""), { body: bodyStr }, handler(callback))
}

function UsersAll(callback) {
    xhr.get("users", handler(callback))
}

function UsersPost(name, callback) {
    let bodyStr = JSON.stringify({ name: name })
    xhr.post("user", { body: bodyStr }, handler(callback))
}

function UsersGet(name, callback) {
    xhr.get("user/" + name, handler(callback))
}

function UsersGrantRole(name, role, callback) {
    xhr.put("user/" + name + "/role" + role, null, handler(callback))
}

module.exports = {
    KVList, KVPut, KVDelete, KVGet, KVPost,
    MembersGet,
    RolesAll, RolesPost, RolesGet, RolesAddPerm,
    UsersAll, UsersPost, UsersGet, UsersGrantRole
}
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

function withAuth(options) {
    return Object.assign(
        options || {},
        {
            "headers": {
                "X-Etcd-Username": localStorage.etcdUsername,
                "X-Etcd-Password": localStorage.etcdPassword
            }
        }
    )
}

function KVList(path, callback) {
    xhr.get("kv" + path + "?list", withAuth(), handler(callback))
}

function KVGet(path, callback) {
    xhr.get("kv" + path, withAuth(), handler(callback))
}

function KVPost(path, value, callback) {
    let bodyStr = JSON.stringify({ value: value })
    xhr.post("kv" + path, withAuth({ body: bodyStr }), handler(callback))
}

function KVPut(path, value, callback) {
    let bodyStr = JSON.stringify({ value: value })
    xhr.put("kv" + path, withAuth({ body: bodyStr }), handler(callback))
}

function KVDelete(path, callback) {
    xhr.del("kv" + path, withAuth(), handler(callback))
}

function MembersGet(callback) {
    xhr.get("members", withAuth(), handler(callback))
}

function RolesAll(callback) {
    xhr.get("roles", withAuth(), handler(callback))
}

function RolesPost(name, callback) {
    let bodyStr = JSON.stringify({ name: name })
    xhr.post("role", withAuth({ body: bodyStr }), handler(callback))
}

function RolesGet(name, callback) {
    xhr.get("role/" + name, withAuth(), handler(callback))
}

function RolesDelete(name, callback) {
    xhr.del("role/" + name, handler(callback))
}

function RolesAddPerm(name, permType, key, rangeEnd, prefix, callback) {
    let bodyStr = JSON.stringify({ perm_type: permType, key: key, range_end: rangeEnd })
    xhr.post("role/" + name + "/permission" + (prefix ? "?prefix" : ""), withAuth({ body: bodyStr }), handler(callback))
}

function RolesDeletePerm(name, key, rangeEnd, callback) {
    let bodyStr = JSON.stringify({ key: key, range_end: rangeEnd })
    xhr.del("role/" + name + "/permission", withAuth({ body: bodyStr }), handler(callback))
}

function UsersAll(callback) {
    xhr.get("users", withAuth(), handler(callback))
}

function UsersPost(name, callback) {
    let bodyStr = JSON.stringify({ name: name })
    xhr.post("user", withAuth({ body: bodyStr }), handler(callback))
}

function UsersGet(name, callback) {
    xhr.get("user/" + name, withAuth(), handler(callback))
}

function UsersDelete(name, callback) {
    xhr.del("user/" + name, withAuth(), handler(callback))
}

function UsersGrantRole(name, role, callback) {
    xhr.put("user/" + name + "/role/" + role, withAuth(), handler(callback))
}

function UsersRovokeRole(name, role, callback) {
    xhr.del("user/" + name + "/role/" + role, withAuth(), handler(callback))
}

function UsersChangePassword(name, password, callback) {
    let bodyStr = JSON.stringify({ password: password })
    xhr.put("user/" + name + "/password", withAuth({ body: bodyStr }), handler(callback))
}

module.exports = {
    KVList, KVPut, KVDelete, KVGet, KVPost,
    MembersGet,
    RolesAll, RolesPost, RolesGet, RolesDelete, RolesAddPerm, RolesDeletePerm,
    UsersAll, UsersPost, UsersGet, UsersDelete, UsersGrantRole, UsersRovokeRole, UsersChangePassword
}
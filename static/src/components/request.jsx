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

module.exports = { KVList, KVPut, KVDelete, KVGet, KVPost, MembersGet }
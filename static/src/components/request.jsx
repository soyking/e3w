import xhr from 'xhr'
import { message } from 'antd';

function get(path, callback) {
    xhr.get(path, function (err, response) {
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
    })
}

function KVList(path, callback) {
    get("kv/" + path + "?list", callback)
}

module.exports = { KVList }
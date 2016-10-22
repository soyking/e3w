package client

import (
	"github.com/coreos/etcd/clientv3"
)

// list a directory
func (clt *EtcdHRCHYClient) Delete(key string) error {
	key, _ = clt.ensureKey(key)
	// directory start with /
	dir := key + "/"

	txn := clt.client.Txn(clt.ctx)
	// delete the whole dir if it's a directory
	txn.If(
		clientv3.Compare(
			clientv3.Value(key),
			"=",
			clt.dirValue,
		),
	).Then(
		clientv3.OpDelete(key),
		clientv3.OpDelete(dir, clientv3.WithPrefix()),
	).Else(
		clientv3.OpDelete(key),
	)

	_, err := txn.Commit()
	return err
}

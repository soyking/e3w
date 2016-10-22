package client

import "github.com/coreos/etcd/clientv3"

// set kv or directory
func (clt *EtcdV3HierarchyClient) Put(key string, value string, dir bool) error {
	key, parentKey := clt.ensureKey(key)

	// special value for dir
	if dir {
		value = clt.dirValue
	}

	txn := clt.client.Txn(clt.ctx)
	// make sure the parentKey is a directory and key has not been set
	txn.If(
		clientv3.Compare(
			clientv3.Value(parentKey),
			"=",
			clt.dirValue,
		),
		clientv3.Compare(
			clientv3.Version(key), // version = 0 if key has not been set
			"=",
			0,
		),
	).Then(
		clientv3.OpPut(key, value),
	)
	resp, err := txn.Commit()
	if err != nil {
		return err
	}

	if !resp.Succeeded {
		return ErrorPutKey
	}

	return nil
}

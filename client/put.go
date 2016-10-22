package client

import "github.com/coreos/etcd/clientv3"

func (clt *EtcdHRCHYClient) PutDir(key string) error {
	return clt.Put(key, clt.dirValue)
}

// set kv or directory
func (clt *EtcdHRCHYClient) Put(key string, value string) error {
	key, parentKey := clt.ensureKey(key)

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

	txnResp, err := txn.Commit()
	if err != nil {
		return err
	}

	if !txnResp.Succeeded {
		return ErrorPutKey
	}

	return nil
}

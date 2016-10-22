package client

import "github.com/coreos/etcd/mvcc/mvccpb"

type Node struct {
	*mvccpb.KeyValue
	IsDir bool
}

// get value of a key, return (isDir, kvs, error)
func (clt *EtcdV3HierarchyClient) Get(key string) (*Node, error) {
	key, _ = clt.ensureKey(key)
	resp, err := clt.client.Get(clt.ctx, key)
	if err != nil {
		return nil, err
	}

	if len(resp.Kvs) == 0 {
		return nil, ErrorKeyNotFound
	}

	return &Node{
		KeyValue: resp.Kvs[0],
		IsDir:    clt.isDir(resp.Kvs[0].Value),
	}, nil
}

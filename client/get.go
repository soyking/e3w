package client

import "github.com/coreos/etcd/mvcc/mvccpb"

type Node struct {
	*mvccpb.KeyValue
	Dir bool
}

// get value of a key, return (isDir, kvs, error)
func (clt *EtcdV3HierarchyClient) Get(key string) (bool, []*Node, error) {
	return false, nil, nil
}

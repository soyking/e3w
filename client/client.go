package client

import (
	"errors"
	"github.com/coreos/etcd/clientv3"
	"github.com/coreos/etcd/mvcc/mvccpb"
)

const (
	DEFAULT_DIR_KEY = "etcdv3_dir_$2H#%gRe3*t"
)

var (
	ErrorInvalidRootPath = errors.New("root key should end with / ")
	ErrorInvalidKey      = errors.New("key should start with root key and not end with / ")
)

type EtcdV3HierarchyClient struct {
	client   *clientv3.Client
	rootKey  string
	dirValue string
}

func New(clt *clientv3.Client, rootKey string, dirValue ...string) (*EtcdV3HierarchyClient, error) {
	if !checkRootKey(rootKey) {
		return nil, ErrorInvalidRootPath
	}

	d := DEFAULT_DIR_KEY
	if len(dirValue) > 0 {
		d = dirValue[0]
	}

	return &EtcdV3HierarchyClient{
		client:   clt,
		rootKey:  rootKey,
		dirValue: d,
	}
}

func (clt *EtcdV3HierarchyClient) FormatRootKey() error {
	return nil
}

type Node struct {
	*mvccpb.KeyValue
	Dir bool
}

// set kv or directory
func (clt *EtcdV3HierarchyClient) Set(path string, value string, dir bool) error {
	return nil
}

// get value of a key, return (isDir, kvs, error)
func (clt *EtcdV3HierarchyClient) Get(path string) (bool, []*Node, error) {
	return false, nil, nil
}

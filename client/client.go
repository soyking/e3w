package client

import (
	"errors"
	"github.com/coreos/etcd/clientv3"
	"github.com/coreos/etcd/mvcc/mvccpb"
	"golang.org/x/net/context"
)

const (
	DEFAULT_DIR_KEY = "etcdv3_dir_$2H#%gRe3*t"
)

var (
	ErrorInvalidRootKey = errors.New("root key should end with / ")
	ErrorPutKey         = errors.New("key is not under a directory or has been set")
	ErrorKeyNotFound    = errors.New("key has not been set")
	ErrorListKey        = errors.New("can only list a directory")
)

// etcd v3 client with Hierarchy
type EtcdHRCHYClient struct {
	client *clientv3.Client
	ctx    context.Context
	// root key as root directory
	rootKey string
	// special value for directory
	dirValue string
}

func New(clt *clientv3.Client, rootKey string, dirValue ...string) (*EtcdHRCHYClient, error) {
	if !checkRootKey(rootKey) {
		return nil, ErrorInvalidRootKey
	}

	d := DEFAULT_DIR_KEY
	if len(dirValue) > 0 {
		d = dirValue[0]
	}

	return &EtcdHRCHYClient{
		client:   clt,
		rootKey:  rootKey,
		dirValue: d,
		ctx:      context.TODO(),
	}, nil
}

// make sure the rootKey is a directory
func (clt *EtcdHRCHYClient) FormatRootKey() error {
	_, err := clt.client.Put(clt.ctx, clt.rootKey, clt.dirValue)
	return err
}

type Node struct {
	*mvccpb.KeyValue
	IsDir bool
}

func (clt *EtcdHRCHYClient) isDir(value []byte) bool {
	return string(value) == clt.dirValue
}

func (clt *EtcdHRCHYClient) createNode(kv *mvccpb.KeyValue) *Node {
	return &Node{
		KeyValue: kv,
		IsDir:    clt.isDir(kv.Value),
	}
}

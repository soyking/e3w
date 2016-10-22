package client

import (
	"github.com/coreos/etcd/clientv3"
	. "gopkg.in/check.v1"
	"testing"
)

const (
	TEST_ETCD_ADDR = "127.0.0.1:2379"
	TEST_ROOT_KEY  = "e3w_test/"
)

func Test(t *testing.T) { TestingT(t) }

var (
	client *EtcdV3HierarchyClient
)

func init() {
	clt, err := clientv3.New(clientv3.Config{Endpoints: []string{TEST_ETCD_ADDR}})
	if err != nil {
		panic(err)
	}

	client, err = New(clt, TEST_ROOT_KEY)
	if err != nil {
		panic(err)
	}

	err = client.FormatRootKey()
	if err != nil {
		panic(err)
	}

	Suite(&ClientSuite{})
	Suite(&PutSuite{})
	Suite(&GetSuite{})
	Suite(&ListSuite{})
	Suite(&DeleteSuite{})
}

type ClientSuite struct{}

func (s *ClientSuite) TestNewClient(c *C) {
	clt, err := clientv3.New(clientv3.Config{Endpoints: []string{TEST_ETCD_ADDR}})
	if err != nil {
		c.Error(err)
	}

	_, err = New(clt, "abc")
	c.Assert(err, Equals, ErrorInvalidRootKey)

	_, err = New(clt, "abc/")
	c.Assert(err, Equals, nil)
}

func (s *ClientSuite) TestEnsureKey(c *C) {
	key, parentKey := client.ensureKey("/abc/def/")
	c.Assert(
		key,
		Equals,
		TEST_ROOT_KEY+"abc/def",
	)
	c.Assert(
		parentKey,
		Equals,
		TEST_ROOT_KEY+"abc",
	)
}

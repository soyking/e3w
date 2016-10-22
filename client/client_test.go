package client

import (
	"github.com/coreos/etcd/clientv3"
	. "gopkg.in/check.v1"
	"testing"
)

const (
	TEST_ETCD_ADDR = "127.0.0.1:2379"
	TEST_ROOT_KEY  = "e3w_test"
)

func Test(t *testing.T) { TestingT(t) }

var (
	client *EtcdHRCHYClient
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
	c.Assert(err, Equals, nil)

	_, err = New(clt, "abc/")
	c.Assert(err, Equals, ErrorInvalidRootKey)
}

func (s *ClientSuite) TestEnsureKey(c *C) {
	clt, err := clientv3.New(clientv3.Config{Endpoints: []string{TEST_ETCD_ADDR}})
	if err != nil {
		c.Error(err)
	}

	client, err := New(clt, "abc")
	c.Assert(err, Equals, nil)

	key, parentKey := client.ensureKey("/")
	c.Assert(key, Equals, "abc")
	c.Assert(parentKey, Equals, "abc")

	key, parentKey = client.ensureKey("/def")
	c.Assert(key, Equals, "abc/def")
	c.Assert(parentKey, Equals, "abc")

	key, parentKey = client.ensureKey("/def/ghi")
	c.Assert(key, Equals, "abc/def/ghi")
	c.Assert(parentKey, Equals, "abc/def")

	client, err = New(clt, "/")
	c.Assert(err, Equals, nil)

	key, parentKey = client.ensureKey("/")
	c.Assert(key, Equals, "/")
	c.Assert(parentKey, Equals, "/")

	key, parentKey = client.ensureKey("/def")
	c.Assert(key, Equals, "/def")
	c.Assert(parentKey, Equals, "/")

	key, parentKey = client.ensureKey("/def/ghi")
	c.Assert(key, Equals, "/def/ghi")
	c.Assert(parentKey, Equals, "/def")
}

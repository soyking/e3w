package client

import (
	. "gopkg.in/check.v1"
	"github.com/coreos/etcd/clientv3"
)

const (
	TEST_GET_KEY   = "/get_key"
	TEST_GET_VALUE = "def"
)

type GetSuite struct{}

func (s *GetSuite) SetUpSuite(c *C) {
	_, err := client.client.Put(client.ctx, TEST_ROOT_KEY+TEST_GET_KEY, TEST_GET_VALUE)
	if err != nil {
		c.Error(err)
	}
}

func (s *GetSuite) TearDownSuite(c *C) {
	_, err := client.client.Delete(client.ctx, TEST_ROOT_KEY+TEST_GET_KEY, clientv3.WithPrefix())
	if err != nil {
		c.Error(err)
	}
}

func (s *GetSuite) TestGet1(c *C) {
	_, err := client.Get(TEST_GET_KEY + "a")
	c.Assert(
		err,
		Equals,
		ErrorKeyNotFound,
	)
}

func (s *GetSuite) TestGet2(c *C) {
	node, err := client.Get("/")
	c.Assert(
		err,
		Equals,
		nil,
	)
	// rootKey
	c.Assert(
		string(node.Value),
		Equals,
		client.dirValue,
	)
}

func (s *GetSuite) TestGet3(c *C) {
	node, err := client.Get(TEST_GET_KEY)
	c.Assert(
		err,
		Equals,
		nil,
	)
	c.Assert(
		string(node.Value),
		Equals,
		TEST_GET_VALUE,
	)
}

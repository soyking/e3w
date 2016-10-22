package client

import (
	"github.com/coreos/etcd/clientv3"
	. "gopkg.in/check.v1"
	"strconv"
)

const (
	TEST_DELETE_KEY        = "delete_dir"
	TEST_DELETE_KEY_SUB    = "key"
	TEST_DELETE_KEY_SUBDIR = "dir"
	TEST_DELETE_COUNT      = 3
)

type DeleteSuite struct{}

func (s *DeleteSuite) SetUpSuite(c *C) {
	_, err := client.client.Put(client.ctx, TEST_ROOT_KEY+TEST_DELETE_KEY, client.dirValue)
	if err != nil {
		c.Error(err)
	}

	_, err = client.client.Put(client.ctx, TEST_ROOT_KEY+TEST_DELETE_KEY+"/"+TEST_DELETE_KEY_SUBDIR, client.dirValue)
	if err != nil {
		c.Error(err)
	}

	_, err = client.client.Put(client.ctx, TEST_ROOT_KEY+TEST_DELETE_KEY+"/"+TEST_DELETE_KEY_SUB, "")
	if err != nil {
		c.Error(err)
	}

	for i := 0; i < TEST_DELETE_COUNT; i++ {
		_, err = client.client.Put(client.ctx, TEST_ROOT_KEY+TEST_DELETE_KEY+"/"+TEST_DELETE_KEY_SUBDIR+"/"+strconv.Itoa(i), "")
		if err != nil {
			c.Error(err)
			break
		}
	}
}

func (s *DeleteSuite) TearDownSuite(c *C) {
	_, err := client.client.Delete(client.ctx, TEST_ROOT_KEY+TEST_DELETE_KEY, clientv3.WithPrefix())
	if err != nil {
		c.Error(err)
	}
}

func (s *DeleteSuite) TestDelete1(c *C) {
	err := client.Delete(TEST_DELETE_KEY + "/" + TEST_DELETE_KEY_SUB)
	c.Assert(
		err,
		Equals,
		nil,
	)

	// make sure Get is ok
	_, err = client.Get(TEST_DELETE_KEY + "/" + TEST_DELETE_KEY_SUB)
	c.Assert(
		err,
		Equals,
		ErrorKeyNotFound,
	)
}

func (s *DeleteSuite) TestDelete2(c *C) {
	err := client.Delete(TEST_DELETE_KEY + "/" + TEST_DELETE_KEY_SUBDIR)
	c.Assert(
		err,
		Equals,
		nil,
	)

	// make sure List is ok
	_, err = client.Get(TEST_DELETE_KEY + "/" + TEST_DELETE_KEY_SUBDIR)
	c.Assert(
		err,
		Equals,
		ErrorKeyNotFound,
	)
}

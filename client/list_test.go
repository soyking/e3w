package client

import (
	"encoding/json"
	"github.com/coreos/etcd/clientv3"
	. "gopkg.in/check.v1"
	"strconv"
)

const (
	TEST_LIST_KEY1  = "list_dir1"
	TEST_LIST_KEY2  = "list_dir2"
	TEST_LIST_COUNT = 5
)

type ListSuite struct{}

func (s *ListSuite) SetUpSuite(c *C) {
	_, err := client.client.Put(client.ctx, TEST_ROOT_KEY+TEST_LIST_KEY1, client.dirValue)
	if err != nil {
		c.Error(err)
	}

	_, err = client.client.Put(client.ctx, TEST_ROOT_KEY+TEST_LIST_KEY2, client.dirValue)
	if err != nil {
		c.Error(err)
	}

	for i := 0; i < TEST_LIST_COUNT; i++ {
		value := "value"
		if i%2 == 0 {
			value = client.dirValue
		}

		_, err = client.client.Put(client.ctx, TEST_ROOT_KEY+TEST_LIST_KEY2+"/"+strconv.Itoa(i), value)
		if err != nil {
			c.Error(err)
		}
	}
}

func (s *ListSuite) TearDownSuite(c *C) {
	_, err := client.client.Delete(client.ctx, TEST_ROOT_KEY+TEST_LIST_KEY1, clientv3.WithPrefix())
	if err != nil {
		c.Error(err)
	}

	_, err = client.client.Delete(client.ctx, TEST_ROOT_KEY+TEST_LIST_KEY2, clientv3.WithPrefix())
	if err != nil {
		c.Error(err)
	}
}

func (s *ListSuite) TestList1(c *C) {
	_, err := client.List(TEST_LIST_KEY1 + "a")
	c.Assert(
		err,
		Equals,
		ErrorListKey,
	)
}

func (s *ListSuite) TestList2(c *C) {
	nodes, err := client.List(TEST_LIST_KEY1)
	c.Assert(
		err,
		Equals,
		nil,
	)

	c.Assert(
		len(nodes),
		Equals,
		0,
	)
}

func (s *ListSuite) TestList3(c *C) {
	nodes, err := client.List(TEST_LIST_KEY2)
	c.Assert(
		err,
		Equals,
		nil,
	)

	c.Assert(
		len(nodes),
		Equals,
		TEST_LIST_COUNT,
	)

	b, _ := json.MarshalIndent(nodes, "", "    ")
	c.Log(string(b))
}

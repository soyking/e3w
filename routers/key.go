package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/soyking/e3ch"
)

type Node struct {
	Key   string `json:"key"`
	Value string `json:"value"`
	IsDir bool   `json:"is_dir"`
}

func parseNode(node *client.Node) *Node {
	return &Node{
		Key:   string(node.Key),
		Value: string(node.Value),
		IsDir: node.IsDir,
	}
}

func getKeyHandler(c *gin.Context, client *client.EtcdHRCHYClient) (interface{}, error) {
	_, list := c.GetQuery("list")
	key := c.Param("key")

	if list {
		nodes, err := client.List(key)
		if err != nil {
			return nil, err
		}

		realNodes := []*Node{}
		for _, node := range nodes {
			realNodes = append(realNodes, parseNode(node))
		}
		return realNodes, nil
	} else {
		node, err := client.Get(key)
		if err != nil {
			return nil, err
		}

		return parseNode(node), nil
	}
}

type postRequest struct {
	Value string `json:"value"`
}

func postKeyHandler(c *gin.Context, client *client.EtcdHRCHYClient) (interface{}, error) {
	_, dir := c.GetQuery("dir")
	key := c.Param("key")

	if dir {
		return nil, client.CreateDir(key)
	} else {
		r := new(postRequest)
		err := parseBody(c, r)
		if err != nil {
			return nil, err
		}
		return nil, client.Create(key, r.Value)
	}
}

func putKeyHandler(c *gin.Context, client *client.EtcdHRCHYClient) (interface{}, error) {
	key := c.Param("key")
	r := new(postRequest)
	err := parseBody(c, r)
	if err != nil {
		return nil, err
	}
	return nil, client.Put(key, r.Value)
}

func delKeyHandler(c *gin.Context, client *client.EtcdHRCHYClient) (interface{}, error) {
	return nil, client.Delete(c.Param("key"))
}

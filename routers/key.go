package routers

import (
	"encoding/base64"
	"github.com/gin-gonic/gin"
	"github.com/soyking/e3ch"
)

type Node struct {
	Key   string `json:"key"`
	Value string `json:"value"`
	IsDir bool   `json:"is_dir"`
}

func base64Decode(src string) (string, error) {
	dst, err := base64.StdEncoding.DecodeString(src)
	return string(dst), err
}

func parseNode(node *client.Node) *Node {
	return &Node{
		Key:   string(node.Key),
		Value: string(node.Value),
		IsDir: node.IsDir,
	}
}

func getKeyHandler(client *client.EtcdHRCHYClient) respHandler {
	return func(c *gin.Context) (interface{}, error) {
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
}

type postRequest struct {
	Value string `json:"value"`
}

func postKeyHandler(client *client.EtcdHRCHYClient) respHandler {
	return func(c *gin.Context) (interface{}, error) {
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
}

func putKeyHandler(client *client.EtcdHRCHYClient) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		key := c.Param("key")
		r := new(postRequest)
		err := parseBody(c, r)
		if err != nil {
			return nil, err
		}
		return nil, client.Put(key, r.Value)
	}
}

func delKeyHandler(client *client.EtcdHRCHYClient) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		return nil, client.Delete(c.Param("key"))
	}
}

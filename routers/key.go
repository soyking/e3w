package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/soyking/e3w/client"
)

func getKeyHandler(client *client.EtcdHRCHYClient) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		_, list := c.GetQuery("list")
		key := c.Param("key")

		if list {
			return client.List(key)
		} else {
			return client.Get(key)
		}
	}
}

type putRequest struct {
	Value string `json:"value"`
}

func putKeyHandler(client *client.EtcdHRCHYClient) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		_, dir := c.GetQuery("dir")
		key := c.Param("key")

		if dir {
			return nil, client.PutDir(key)
		} else {
			r := new(putRequest)
			err := parseBody(c, r)
			if err != nil {
				return nil, err
			}
			return nil, client.Put(key, r.Value)
		}
	}
}

func delKeyHandler(client *client.EtcdHRCHYClient) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		return nil, nil
	}
}

package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/soyking/e3w/client"
)

func getKeyHandler(client *client.EtcdHRCHYClient) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		c.GetQuery("list")
		return nil, nil
	}
}

func putKeyHandler(client *client.EtcdHRCHYClient) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		return nil, nil
	}
}

func delKeyHandler(client *client.EtcdHRCHYClient) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		return nil, nil
	}
}

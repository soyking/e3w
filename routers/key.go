package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/soyking/e3w/client"
)

func getKeyHandler(client *client.EtcdV3HierarchyClient) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		return nil, nil
	}
}

func putKeyHandler(client *client.EtcdV3HierarchyClient) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		return nil, nil
	}
}

func delKeyHandler(client *client.EtcdV3HierarchyClient) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		return nil, nil
	}
}

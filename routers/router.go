package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/soyking/e3w/client"
)

func InitRouters(g *gin.Engine, client *client.EtcdHRCHYClient) {
	g.GET("/kv/*key", resp(getKeyHandler(client)))
	g.PUT("/kv/*key", resp(putKeyHandler(client)))
	g.DELETE("/kv/*key", resp(delKeyHandler(client)))
}

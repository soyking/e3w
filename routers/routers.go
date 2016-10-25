package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/soyking/e3ch"
)

func InitRouters(g *gin.Engine, client *client.EtcdHRCHYClient) {
	g.GET("/", func(c *gin.Context) {
		c.File("./static/dist/index.html")
	})
	g.Static("/public", "./static")

	g.GET("/kv/*key", resp(getKeyHandler(client)))
	g.POST("/kv/*key", resp(postKeyHandler(client)))
	g.PUT("/kv/*key", resp(putKeyHandler(client)))
	g.DELETE("/kv/*key", resp(delKeyHandler(client)))
}

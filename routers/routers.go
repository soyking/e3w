package routers

import (
	"github.com/coreos/etcd/clientv3"
	"github.com/gin-gonic/gin"
	"github.com/soyking/e3ch"
)

func InitRouters(g *gin.Engine, etcdClt *clientv3.Client, client *client.EtcdHRCHYClient) {
	g.GET("/", func(c *gin.Context) {
		c.File("./static/dist/index.html")
	})
	g.Static("/public", "./static/dist")

	// key/value actions
	g.GET("/kv/*key", resp(getKeyHandler(client)))
	g.POST("/kv/*key", resp(postKeyHandler(client)))
	g.PUT("/kv/*key", resp(putKeyHandler(client)))
	g.DELETE("/kv/*key", resp(delKeyHandler(client)))

	// members actions
	g.GET("/members", resp(getMembersHandler(etcdClt)))
}

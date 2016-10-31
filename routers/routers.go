package routers

import (
	"github.com/coreos/etcd/clientv3"
	"github.com/gin-gonic/gin"
	"github.com/soyking/e3ch"
)

type e3chHandler func(*gin.Context, *client.EtcdHRCHYClient) (interface{}, error)

type etcdHandler func(*gin.Context, *clientv3.Client) (interface{}, error)

func etcdWrapper(e3chClt *client.EtcdHRCHYClient, h etcdHandler) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		return h(c, e3chClt.EtcdClient())
	}
}

func authWrapper(e3chClt *client.EtcdHRCHYClient, h e3chHandler) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		return h(c, e3chClt)
	}
}

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

	// roles actions
	g.GET("/roles", resp(getRolesHandler(etcdClt)))
	g.POST("/role", resp(createRoleHandler(etcdClt)))
	g.GET("/role/:name", resp(getRolePermsHandler(etcdClt)))
	g.DELETE("/role/:name", resp(deleteRoleHandler(etcdClt)))
	g.POST("/role/:name/permission", resp(createRolePermHandler(etcdClt)))
	g.DELETE("/role/:name/permission", resp(deleteRolePermHandler(etcdClt)))

	// users actions
	g.GET("/users", resp(getUsersHandler(etcdClt)))
	g.POST("/user", resp(createUserHandler(etcdClt)))
	g.GET("/user/:name", resp(getUserRolesHandler(etcdClt)))
	g.DELETE("/user/:name", resp(deleteUserHandler(etcdClt)))
	g.PUT("/user/:name/password", resp(setUserPasswordHandler(etcdClt)))
	g.PUT("/user/:name/role/:role", resp(grantUserRoleHandler(etcdClt)))
	g.DELETE("/user/:name/role/:role", resp(revorkeUserRoleHandler(etcdClt)))
}

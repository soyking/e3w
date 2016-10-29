package routers

import (
	"github.com/coreos/etcd/clientv3"
	"github.com/gin-gonic/gin"
)

func getRolesHandler(client *clientv3.Client) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		roles, err := client.RoleList(newEtcdCtx())
		if err != nil {
			return nil, err
		} else {
			return roles.Roles, nil
		}
	}
}

type createRoleRequest struct {
	Name string `json:"name"`
}

func createRoleHandler(client *clientv3.Client) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		r := new(createRoleRequest)
		err := parseBody(c, r)
		if err != nil {
			return nil, err
		}

		if r.Name == "" {
			return nil, errRoleName
		}

		_, err = client.RoleAdd(newEtcdCtx(), r.Name)
		return nil, err
	}
}

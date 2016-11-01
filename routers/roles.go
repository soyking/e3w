package routers

import (
	"github.com/coreos/etcd/auth/authpb"
	"github.com/coreos/etcd/clientv3"
	"github.com/gin-gonic/gin"
	"github.com/soyking/e3ch"
)

func getRolesHandler(c *gin.Context, client *clientv3.Client) (interface{}, error) {
	resp, err := client.RoleList(newEtcdCtx())
	if err != nil {
		return nil, err
	} else {
		return resp.Roles, nil
	}
}

type createRoleRequest struct {
	Name string `json:"name"`
}

func createRoleHandler(c *gin.Context, client *clientv3.Client) (interface{}, error) {
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

func getRolePermsHandler(c *gin.Context, client *client.EtcdHRCHYClient) (interface{}, error) {
	name := c.Param("name")
	if name == "" {
		return nil, errRoleName
	}

	return client.GetRolePerms(name)
}

func deleteRoleHandler(c *gin.Context, client *clientv3.Client) (interface{}, error) {
	name := c.Param("name")
	if name == "" {
		return nil, errRoleName
	}

	_, err := client.RoleDelete(newEtcdCtx(), name)
	return nil, err
}

type createRolePermRequest struct {
	Key      string `json:"key"`
	RangeEnd string `json:"range_end"`
	PermType string `json:"perm_type"`
}

func createRolePermHandler(c *gin.Context, client *client.EtcdHRCHYClient) (interface{}, error) {
	name := c.Param("name")
	if name == "" {
		return nil, errRoleName
	}

	r := new(createRolePermRequest)
	err := parseBody(c, r)
	if err != nil {
		return nil, err
	}

	tp, ok := authpb.Permission_Type_value[r.PermType]
	if !ok {
		return nil, errInvalidPermType
	}

	_, withPrefix := c.GetQuery("prefix")
	if withPrefix {
		r.RangeEnd = clientv3.GetPrefixRangeEnd(r.Key)
	}

	return nil, client.RoleGrantPermission(name, r.Key, r.RangeEnd, clientv3.PermissionType(tp))
}

type deleteRolePermRequest struct {
	Key      string `json:"key"`
	RangeEnd string `json:"range_end"`
}

func deleteRolePermHandler(c *gin.Context, client *client.EtcdHRCHYClient) (interface{}, error) {
	name := c.Param("name")
	if name == "" {
		return nil, errRoleName
	}

	r := new(deleteRolePermRequest)
	err := parseBody(c, r)
	if err != nil {
		return nil, err
	}

	_, withPrefix := c.GetQuery("prefix")
	if withPrefix {
		r.RangeEnd = clientv3.GetPrefixRangeEnd(r.Key)
	}

	return nil, client.RoleRevokePermission(name, r.Key, r.RangeEnd)
}

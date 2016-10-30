package routers

import (
	"github.com/coreos/etcd/auth/authpb"
	"github.com/coreos/etcd/clientv3"
	"github.com/gin-gonic/gin"
)

func getRolesHandler(client *clientv3.Client) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		resp, err := client.RoleList(newEtcdCtx())
		if err != nil {
			return nil, err
		} else {
			return resp.Roles, nil
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

type Perm struct {
	PermType string `json:"perm_type"`
	Key      string `json:"key"`
	RangeEnd string `json:"range_end"`
}

func parsePerms(etcdPerms []*authpb.Permission) []*Perm {
	perms := []*Perm{}
	for _, p := range etcdPerms {
		perm := &Perm{
			PermType: authpb.Permission_Type_name[int32(p.PermType)],
			Key:      string(p.Key),
			RangeEnd: string(p.RangeEnd),
		}
		perms = append(perms, perm)
	}
	return perms
}

func getRolePermsHandler(client *clientv3.Client) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		name := c.Param("name")
		if name == "" {
			return nil, errRoleName
		}

		resp, err := client.RoleGet(newEtcdCtx(), name)
		if err != nil {
			return nil, err
		} else {
			return parsePerms(resp.Perm), nil
		}
	}
}

func deleteRoleHandler(client *clientv3.Client) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		name := c.Param("name")
		if name == "" {
			return nil, errRoleName
		}

		_, err := client.RoleDelete(newEtcdCtx(), name)
		return nil, err
	}
}

type createRolePermRequest struct {
	Key      string `json:"key"`
	RangeEnd string `json:"range_end"`
	PermType string `json:"perm_type"`
}

func createRolePermHandler(client *clientv3.Client) respHandler {
	return func(c *gin.Context) (interface{}, error) {
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

		return client.RoleGrantPermission(newEtcdCtx(), name, r.Key, r.RangeEnd, clientv3.PermissionType(tp))
	}
}

type deleteRolePermRequest struct {
	Key      string `json:"key"`
	RangeEnd string `json:"range_end"`
}

func deleteRolePermHandler(client *clientv3.Client) respHandler {
	return func(c *gin.Context) (interface{}, error) {
		name := c.Param("name")
		if name == "" {
			return nil, errRoleName
		}

		r := new(deleteRolePermRequest)
		err := parseBody(c, r)
		if err != nil {
			return nil, err
		}

		return client.RoleRevokePermission(newEtcdCtx(), name, r.Key, r.RangeEnd)
	}
}

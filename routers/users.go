package routers

import (
	"github.com/gin-gonic/gin"
	"go.etcd.io/etcd/clientv3"
)

func getUsersHandler(c *gin.Context, client *clientv3.Client) (interface{}, error) {
	resp, err := client.UserList(newEtcdCtx())
	if err != nil {
		return nil, err
	} else {
		return resp.Users, nil
	}
}

type createUserRequest struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

func createUserHandler(c *gin.Context, client *clientv3.Client) (interface{}, error) {
	r := new(createUserRequest)
	err := parseBody(c, r)
	if err != nil {
		return nil, err
	}

	if r.Name == "" {
		return nil, errUserName
	}

	_, err = client.UserAdd(newEtcdCtx(), r.Name, r.Password)
	return nil, err
}

func getUserRolesHandler(c *gin.Context, client *clientv3.Client) (interface{}, error) {
	name := c.Param("name")
	resp, err := client.UserGet(newEtcdCtx(), name)
	if err != nil {
		return nil, err
	} else {
		return resp.Roles, nil
	}
}

func deleteUserHandler(c *gin.Context, client *clientv3.Client) (interface{}, error) {
	name := c.Param("name")
	_, err := client.UserDelete(newEtcdCtx(), name)
	return nil, err
}

type setUserPasswordRequest struct {
	Password string `json:"password"`
}

func setUserPasswordHandler(c *gin.Context, client *clientv3.Client) (interface{}, error) {
	r := new(setUserPasswordRequest)
	err := parseBody(c, r)
	if err != nil {
		return nil, err
	}

	name := c.Param("name")
	_, err = client.UserChangePassword(newEtcdCtx(), name, r.Password)
	return nil, err
}

func grantUserRoleHandler(c *gin.Context, client *clientv3.Client) (interface{}, error) {
	name := c.Param("name")
	role := c.Param("role")

	_, err := client.UserGrantRole(newEtcdCtx(), name, role)
	return nil, err
}

func revokeUserRoleHandler(c *gin.Context, client *clientv3.Client) (interface{}, error) {
	name := c.Param("name")
	role := c.Param("role")

	_, err := client.UserRevokeRole(newEtcdCtx(), name, role)
	return nil, err
}

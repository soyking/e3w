package routers

import "errors"

var (
	errRoleName  = errors.New("role's name should not be empty")
	errRoleExist = errors.New("role has existed")
)

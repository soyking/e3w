package routers

import "errors"

var (
	errRoleName        = errors.New("role's name should not be empty")
	errInvalidPermType = errors.New("perm type should be READ | WRITE | READWRITE")
)

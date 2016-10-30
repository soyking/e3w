package routers

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"
	"io/ioutil"
	"time"
)

const (
	ETCD_CLIENT_TIMEOUT = 3 * time.Second
)

func parseBody(c *gin.Context, t interface{}) error {
	defer c.Request.Body.Close()
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		return err
	}

	return json.Unmarshal(body, t)
}

func newEtcdCtx() context.Context {
	ctx, _ := context.WithTimeout(context.Background(), ETCD_CLIENT_TIMEOUT)
	return ctx
}

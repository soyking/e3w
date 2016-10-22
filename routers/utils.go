package routers

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"io/ioutil"
)

func parseBody(c *gin.Context, t interface{}) error {
	defer c.Request.Body.Close()
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		return err
	}

	return json.Unmarshal(body, t)
}

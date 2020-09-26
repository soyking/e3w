package routers

import (
	"github.com/gin-gonic/gin"
	"go.etcd.io/etcd/clientv3"
	"go.etcd.io/etcd/etcdserver/etcdserverpb"
)

const (
	ROLE_LEADER   = "leader"
	ROLE_FOLLOWER = "follower"

	STATUS_HEALTHY   = "healthy"
	STATUS_UNHEALTHY = "unhealthy"
)

type Member struct {
	*etcdserverpb.Member
	Role   string `json:"role"`
	Status string `json:"status"`
	DbSize int64  `json:"db_size"`
}

func getMembersHandler(c *gin.Context, client *clientv3.Client) (interface{}, error) {
	resp, err := client.MemberList(newEtcdCtx())
	if err != nil {
		return nil, err
	}

	members := []*Member{}
	for _, member := range resp.Members {
		if len(member.ClientURLs) > 0 {
			m := &Member{Member: member, Role: ROLE_FOLLOWER, Status: STATUS_UNHEALTHY}
			resp, err := client.Status(newEtcdCtx(), m.ClientURLs[0])
			if err == nil {
				m.Status = STATUS_HEALTHY
				m.DbSize = resp.DbSize
				if resp.Leader == resp.Header.MemberId {
					m.Role = ROLE_LEADER
				}
			}
			members = append(members, m)
		}
	}

	return members, nil
}

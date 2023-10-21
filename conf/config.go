package conf

import (
	"time"

	"gopkg.in/ini.v1"
)

const (
	EtcdTimeout = time.Second * 10
)

type Config struct {
	Port            string
	Auth            bool
	EtcdRootKey     string
	DirValue        string
	EtcdEndPoints   []string
	EtcdUsername    string
	EtcdPassword    string
	EtcdDialTimeout time.Duration
	CertFile        string
	KeyFile         string
	CAFile          string
	SkipVerifyTLS   bool
}

func Init(filepath string) (*Config, error) {
	cfg, err := ini.Load(filepath)
	if err != nil {
		return nil, err
	}

	c := &Config{}

	appSec := cfg.Section("app")
	c.Port = appSec.Key("port").Value()
	c.Auth = appSec.Key("auth").MustBool()

	etcdSec := cfg.Section("etcd")
	c.EtcdRootKey = etcdSec.Key("root_key").Value()
	c.DirValue = etcdSec.Key("dir_value").Value()
	c.EtcdEndPoints = etcdSec.Key("addr").Strings(",")
	c.EtcdDialTimeout = etcdSec.Key("dial_timeout").MustDuration(EtcdTimeout)
	c.EtcdUsername = etcdSec.Key("username").Value()
	c.EtcdPassword = etcdSec.Key("password").Value()
	c.CertFile = etcdSec.Key("cert_file").Value()
	c.KeyFile = etcdSec.Key("key_file").Value()
	c.CAFile = etcdSec.Key("ca_file").Value()
	c.SkipVerifyTLS = etcdSec.Key("skip_verify_tls").MustBool()

	return c, nil
}

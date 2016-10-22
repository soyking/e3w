package conf

import (
	"gopkg.in/ini.v1"
)

type Config struct {
	Port          string
	EtcdRootKey   string
	EtcdEndPoints []string
	EtcdUsername  string
	EtcdPassword  string
}

func Init(filepath string) (*Config, error) {
	cfg, err := ini.Load(filepath)
	if err != nil {
		return nil, err
	}

	c := &Config{}

	appSec := cfg.Section("app")
	c.Port = appSec.Key("port").Value()

	etcdSec := cfg.Section("etcd")
	c.EtcdRootKey = etcdSec.Key("root_key").Value()
	c.EtcdEndPoints = etcdSec.Key("addr").Strings(",")
	c.EtcdUsername = etcdSec.Key("username").Value()
	c.EtcdPassword = etcdSec.Key("password").Value()

	return c, nil
}

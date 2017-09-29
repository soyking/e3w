package conf

import (
	"gopkg.in/ini.v1"
)

type Config struct {
	Port          string
	Auth          bool
	EtcdRootKey   string
	DirValue      string
	EtcdEndPoints []string
	CertFile      string
	KeyFile       string
	TrustedCAFile string
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
	c.Auth = appSec.Key("auth").MustBool()

	etcdSec := cfg.Section("etcd")
	c.EtcdRootKey = etcdSec.Key("root_key").Value()
	c.DirValue = etcdSec.Key("dir_value").Value()
	c.EtcdEndPoints = etcdSec.Key("addr").Strings(",")
	c.TrustedCAFile = etcdSec.Key("ca_file").Value()
	c.CertFile = etcdSec.Key("cert_file").Value()
	c.KeyFile = etcdSec.Key("key_file").Value()
	c.EtcdUsername = etcdSec.Key("username").Value()
	c.EtcdPassword = etcdSec.Key("password").Value()

	return c, nil
}

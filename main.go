package main

import (
	"flag"
	"fmt"
	"github.com/coreos/etcd/clientv3"
	"github.com/gin-gonic/gin"
	"github.com/soyking/e3ch"
	"github.com/soyking/e3w/conf"
	"github.com/soyking/e3w/routers"
	"os"
)

const (
	PROGRAM_NAME      = "e3w"
	PROGRAM_VERSION   = "0.0.1"
	ETCD_TEST_VERSION = "3.1.0-rc.0+git"
)

var configFilepath string

func init() {
	flag.StringVar(&configFilepath, "conf", "conf/config.default.ini", "config file path")
	rev := flag.Bool("rev", false, "print rev")
	flag.Parse()

	if *rev {
		fmt.Printf("[%s v%s]\n[etcd %s]\n",
			PROGRAM_NAME, PROGRAM_VERSION,
			ETCD_TEST_VERSION,
		)
		os.Exit(0)
	}
}

func initClient(config *conf.Config) (*clientv3.Client, *client.EtcdHRCHYClient, error) {
	clt, err := clientv3.New(clientv3.Config{
		Endpoints: config.EtcdEndPoints,
		Username:  config.EtcdUsername,
		Password:  config.EtcdPassword,
	})
	if err != nil {
		return nil, nil, err
	}

	client, err := client.New(clt, config.EtcdRootKey)
	if err != nil {
		return nil, nil, err
	}
	return clt, client, client.FormatRootKey()
}

func main() {
	config, err := conf.Init(configFilepath)
	if err != nil {
		panic(err)
	}

	etcdClt, client, err := initClient(config)
	if err != nil {
		panic(err)
	}

	router := gin.Default()
	routers.InitRouters(router, etcdClt, client)
	router.Run(":" + config.Port)
}

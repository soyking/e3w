package client

import (
	"path"
	"strings"
)

func checkRootKey(rootKey string) bool {
	return strings.HasSuffix(rootKey, "/")
}

// ensure key, return (realKey, parentKey)
func (clt *EtcdV3HierarchyClient) ensureKey(key string) (string, string) {
	key = clt.rootKey + strings.Trim(key, "/")
	parentKey := path.Clean(key + "/../")
	return key, parentKey
}

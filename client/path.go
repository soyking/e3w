package client

import (
	"path"
	"strings"
)

func isRoot(key string) bool {
	return key == "/"
}

func checkRootKey(rootKey string) bool {
	return isRoot(rootKey) || !strings.HasSuffix(rootKey, "/")
}

// ensure key, return (realKey, parentKey)
func (clt *EtcdHRCHYClient) ensureKey(key string) (string, string) {
	if isRoot(key) {
		return clt.rootKey, clt.rootKey
	}

	prefix := ""
	if !isRoot(clt.rootKey) {
		prefix = clt.rootKey
	}
	realKey := prefix + strings.TrimRight(key, "/")
	return realKey, path.Clean(realKey + "/../")
}

package client

import (
	"path"
	"strings"
)

func isRoot(key string) bool {
	return key == "/"
}

func checkRootKey(rootKey string) bool {
	return rootKey != "" && !strings.HasSuffix(rootKey, "/")
}

// ensure key, return (realKey, parentKey)
func (clt *EtcdHRCHYClient) ensureKey(key string) (string, string, error) {
	if !strings.HasPrefix(key, "/") {
		return "", "", ErrorInvalidKey
	}

	if isRoot(key) {
		return clt.rootKey, clt.rootKey, nil
	} else {
		realKey := clt.rootKey + path.Clean(key)
		return realKey, path.Clean(realKey + "/../"), nil
	}
}

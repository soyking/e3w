package client

import (
	"path"
	"strings"
)

func checkRootKey(rootKey string) bool {
	return strings.HasSuffix(rootKey, "/")
}

func (clt *EtcdV3HierarchyClient) ensureKey(key string) (string, error) {
	if !strings.HasPrefix(key, clt.rootKey) || strings.HasSuffix(key, "/") {
		return "", ErrorInvalidKey
	}

	parentKey := path.Clean(key + "/../")
	return parentKey, nil
}

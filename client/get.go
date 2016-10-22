package client

// get value of a key
func (clt *EtcdV3HierarchyClient) Get(key string) (*Node, error) {
	key, _ = clt.ensureKey(key)
	resp, err := clt.client.Get(clt.ctx, key)
	if err != nil {
		return nil, err
	}

	if len(resp.Kvs) == 0 {
		return nil, ErrorKeyNotFound
	}

	return clt.createNode(resp.Kvs[0]), nil
}

e3w
===

etcd v3 Web UI based on [Golang](https://golang.org/) && [React](https://facebook.github.io/react/)

supporting hierarchy on etcd v3, based on [e3ch](https://github.com/soyking/e3ch)

## Overview

KEY/VALUE

![](./images/kv.png)

MEMBERS

![](./images/members.png)

## Usage

```
go get github.com/soyking/e3w

# frontend
cd static
npm install
npm run publish

# backend
# start etcd
# edit conf/config.default.ini
go build && ./e3w
```
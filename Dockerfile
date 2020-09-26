# docker build -t soyking/e3w .
FROM golang:1.14 as backend
RUN mkdir -p /go/src/github.com/soyking/e3w
ADD . /go/src/github.com/soyking/e3w
WORKDIR /go/src/github.com/soyking/e3w
RUN CGO_ENABLED=0 GOPROXY=https://goproxy.io go build

FROM node:8 as frontend
RUN mkdir /app
ADD static /app
WORKDIR /app
RUN npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/mirrors/node \
--userconfig=$HOME/.cnpmrc install && npm run publish

FROM alpine:latest
RUN mkdir -p /app/static/dist /app/conf
COPY --from=backend /go/src/github.com/soyking/e3w/e3w /app
COPY --from=frontend /app/dist /app/static/dist
COPY conf/config.default.ini /app/conf
EXPOSE 8080
WORKDIR /app
CMD ["./e3w"]

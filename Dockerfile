# docker build -t soyking/e3w .
FROM golang:1.17 as backend
RUN mkdir -p /e3w
ADD . /e3w
WORKDIR /e3w
RUN CGO_ENABLED=0 GOPROXY=https://goproxy.io go build

FROM node:8 as frontend
RUN mkdir /app
ADD static /app
WORKDIR /app
RUN npm --registry=https://registry.npmmirror.com \
    --cache=$HOME/.npm/.cache/cnpm \
    --disturl=https://npmmirror.com/mirrors/node \
    --userconfig=$HOME/.cnpmrc install && npm run publish

FROM alpine:latest
RUN mkdir -p /app/static/dist /app/conf
COPY --from=backend /e3w/e3w /app
COPY --from=frontend /app/dist /app/static/dist
COPY conf/config.default.ini /app/conf
EXPOSE 8080
WORKDIR /app
CMD ["./e3w"]

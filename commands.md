# Docker Commands

## Build

`docker build --tag docker-sauces .`

## Run

`docker run --publish 3000:3000 docker-sauces
`

## Test

`docker run docker-test sh -c "npm run test"`

## Run Prod

`# docker build -t node-docker --target production .`
FROM node:10-alpine3.9 as builder
COPY . /project
WORKDIR /project
RUN npm run build

FROM node:10-alpine3.9 as builder
COPY --from=builder /project/build /app
WORKDIR /app
RUN npm install -g serve
ENTRYPOINT serve -s .

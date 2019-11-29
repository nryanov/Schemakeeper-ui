FROM node:10-alpine3.9 as builder
COPY . /project
WORKDIR /project
RUN npm install && npm run build

FROM node:10-alpine3.9
COPY --from=builder /project/build /app
WORKDIR /app
EXPOSE 5000
RUN npm install -g serve
CMD serve -s .

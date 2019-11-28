# schemakeeper-ui
 Schemakeeper Web UI

```
docker run --name=schemakeeper -p 9081:9081 \
 -e SCHEMAKEEPER_ALLOWS_ORIGIN=* \
 -e SCHEMAKEEPER_ALLOWS_METHODS=GET,POST,PUT,DELETE \
 -e SCHEMAKEEPER_ALLOWS_HEADER=Content-Type \
 -d schemakeeper/server:0.1
```


```
npm build
serve -s build
```
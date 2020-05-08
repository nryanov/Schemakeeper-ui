# schemakeeper-ui

[![Build Status](https://img.shields.io/travis/nryanov/schemakeeper-ui/master.svg)](https://travis-ci.com/nryanov/schemakeeper-ui)

This is a web tool for the [schemakeeper](https://github.com/nryanov/schemakeeper).
 
## Build from source
```text
git clone https://github.com/nryanov/Schemakeeper-ui.git
cd schemakeeper-ui
npm install
npm run build
```

Built static files will be in the `./build` directory.

## Run
To run project you can use static server. 
Example using [serve](https://github.com/zeit/serve):
```text
npm install -g serve
serve -s build
```

For more information see: [Deployment](https://create-react-app.dev/docs/deployment/)

## Run via docker
```text
docker run --name=schemakeeper-ui -p 5000:5000 \
    -e REACT_APP_SCHEMAKEEPER_URL=http://localhost:9081 \
    -e REACT_APP_ALLOW_TO_DELETE_SUBJECTS=false \
    -e REACT_APP_ALLOW_TO_DELETE_SUBJECTS_SCHEMAS=false \
    -d nryanov/schemakeeper-ui:{version}
```

## Settings
To configure app you can use REACT_APP_* environment variables:
- REACT_APP_SCHEMAKEEPER_URL - host of schemakeeper server (default: http://localhost:9081)
- REACT_APP_ALLOW_TO_DELETE_SUBJECTS - allow to delete subjects (default: false)
- REACT_APP_ALLOW_TO_DELETE_SUBJECTS_SCHEMAS - allow to delete schema versions from subjects (default: false)

## CORS
To be able to use this tool it is needed to configure CORS seetings in schemakeeper-server:

```
docker run --name=schemakeeper -p 9081:9081 \
 -e SCHEMAKEEPER_ALLOWS_ORIGINS=* \
 -e SCHEMAKEEPER_ALLOWS_METHODS=GET,POST,PUT,DELETE \
 -e SCHEMAKEEPER_ALLOWS_HEADERS=* \
 -d nryanov/schemakeeper:{version}
```


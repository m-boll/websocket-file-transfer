# websocket-file-transfer

A PoC webapp for exchanging files via websockets with a backend server.

## Deploy server locally

1. Clone the repo
2. Run the following command to install dependencies: 

```bash
$ npm install
```

3. Start the server with the following command: 

```bash
$ npm start
```

## Deploy server with Docker

1. Clone the repo 
2. In order to build the container run: 

```bash
$ docker build -t websocket-app .
```

3. Run the following command to start the container: 

```bash
$ docker run -p 3000:3000 websocket-app
```

By default, the websocket will be accessible on `localhost`. If the socket should be accessible through a public domain you can use the environment variable `RHOST` to set the name. (e.g. `docker run -p 3000:3000 -e "RHOST=example.org" websocket-app`)

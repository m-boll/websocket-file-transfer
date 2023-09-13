const { Server } = require("socket.io");
const { stringReplace } = require('string-replace-middleware');
const express = require('express');
const http = require('http');
const serveStatic = require('serve-static');
const path = require("path")
const fs = require('fs');

const WEB_PORT = 3000;
const DOMAIN = process.env.RHOST || "localhost";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	maxHttpBufferSize: 1e8
});

io.on("connection", (socket) => {

	// upload file
	socket.on("upload", (data, callback) => {
	    // save the content to the disk
	    fs.writeFile(path.join(__dirname, "upload/") + data.name, Buffer.from(data.content, 'base64'), (err) => {
	      callback({ message: err ? "failure" : "success" });
	    });
	});

	// download file
	socket.on("download", (data, callback) => {

		fs.readFile(__dirname + "/download/test.exe", (err, data) => {
  			if (err) {
    			callback({message: "failure"});
    			return;
  			}

  			callback({message: "success"});

  			let buff = new Buffer.from(data);
  			let base64_data = buff.toString('base64');

  			io.emit("file sent", {
  				file: base64_data
			});
		});


	})
});


// replace template strings for ws connection string
app.use(stringReplace({
    '{{WS_CON}}': "ws://" + DOMAIN + ":" + WEB_PORT + "/"
}));

// just serve one static index.hmtl file
app.get('/', function(req, res) {
	  res.sendFile("./public/index.html", {root: __dirname});
});

//app.use(serveStatic('public'));

server.listen(WEB_PORT, () => {
  console.log(`Websocket app listening on port ${WEB_PORT}`)
})

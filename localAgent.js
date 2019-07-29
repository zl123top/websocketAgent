const http = require('http');
const https = require('https');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
const port1 = 3001;
const remoteHostname = '47.74.251.57';

http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
  console.log(req.url);
}).listen(port);

https.createServer((req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(port1);
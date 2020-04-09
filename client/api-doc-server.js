const express = require('express');
const docJson = require('../client/ariaDoc');
const http = require('http');
let app = express();

app = http.createServer(function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.end(JSON.stringify(docJson));
});


app.listen(3002);

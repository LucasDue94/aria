const express = require('express');
const apiDoc = require('./apidoc');
const cors = require('cors');
let app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.redirect('/v1/doc')
});

app.get('/v1/doc', function (req, res) {
  res.json(apiDoc)
});

app.listen(3002);


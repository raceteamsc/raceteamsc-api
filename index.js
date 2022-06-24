const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;

app.use(cors());
routes(app);

app.use(express.static('public'));

server.listen(port, () =>
  console.log(`servidor está rodando na porta ${port}`),
);

module.exports = server;

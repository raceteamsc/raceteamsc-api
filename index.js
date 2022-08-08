require('dotenv/config');
const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');
const server = require('http').createServer(app);
const port = process.env.PORT || 3001;
app.use(express.static('uploads'));

app.engine('html', require('ejs').renderFile);

app.use(cors());
routes(app);

server.listen(port, () =>
  console.log(`servidor está rodando na porta ${port}`),
);

module.exports = server;

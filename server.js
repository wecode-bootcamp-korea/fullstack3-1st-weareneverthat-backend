const http = require('http');
const express = require('express');
const routes = require('./routes/index');

const app = express();
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

const server = http.createServer(app);

server.listen(8000, () => {
  console.log('server is listening on PORT 8000');
});

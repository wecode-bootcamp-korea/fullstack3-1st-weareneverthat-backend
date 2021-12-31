const http = require('http');
const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const server = http.createServer(app);

server.listen(8000, () => {
	console.log('server is listening on PORT 8000');
});

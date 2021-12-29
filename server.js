const http = require('http');
const express = require('express');
const { prismaClient } = require('@prisma/client');
const routes = require('./routes');
const cors = require('cors');
const prisma = new prismaClient();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const server = http.createServer(app);

const start = async () => {
	try {
		server.listen(8000, () => console.log('server is listening on PORT 8000'));
	} catch (err) {
		console.log(err);
		await prisma.$disconnect();
	}
};

start();

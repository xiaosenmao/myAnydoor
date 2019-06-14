const http = require('http');
const path = require('path');
const chalk = require('chalk');
const conf = require('./config/defaultConfig');
const route = require('./helper/route');


const server = http.createServer((req, res) => {
	const filePath = path.join(conf.root, req.url);
	route(req, res, filePath);
});

const { hostname, port } = conf;
server.listen(port, hostname, () => {
	const address = `http://${hostname}:${port}`;

	console.info(`Server started at ${chalk.green(address)}`);
});

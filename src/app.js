const http = require('http');
const path = require('path');
const chalk = require('chalk');
const conf = require('./config/defaultConfig');
const route = require('./helper/route');
const openUrl = require('./helper/openUrl');

class Server {
	constructor(config) {
		this.conf = Object.assign({}, conf, config);
	}

	start() {
		const server = http.createServer((req, res) => {
			const filePath = path.join(this.conf.root, req.url);
			route(req, res, filePath, this.conf);
		});

		const { hostname, port } = this.conf;
		server.listen(port, hostname, () => {
			const address = `http://${hostname}:${port}`;

			console.info(`Server started at ${chalk.green(address)}`);
			openUrl(address);
		});
	}
}

module.exports = Server;



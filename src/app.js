import http from 'http';
import path from 'path';
import chalk from 'chalk';
import conf from './config/defaultConfig';
import route from './helper/route';
import openUrl from './helper/openUrl';

export default class Server {
	constructor(config) {
		this.conf = { ...conf, ...config };
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

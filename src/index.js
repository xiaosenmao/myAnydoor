import yargs from 'yargs';
import Server from './app';

const argv = yargs
	.usage('anywhere [options]')
	.option('p', {
		alias: 'port',
		describle: '端口号',
		default: 9527
	})
	.option('h', {
		alias: 'hostname',
		describle: 'host',
		default: '127.0.0.1'
	})
	.option('d', {
		alias: 'root',
		describle: 'root path',
		default: process.cwd()
	})
	.version()
	.alias('v', 'version')
	.help()
	.argv;

const server = new Server(argv);
server.start();

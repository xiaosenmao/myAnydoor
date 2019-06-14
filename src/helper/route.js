const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;  // 在 Node 8+ 中，你可以使用 util.promisify 转换一个异步函数，以返回一个 promise
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const config = require('../config/defaultConfig');

const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath, 'utf8');
const template= Handlebars.compile(source);

module.exports = async function (req, res, filePath) {
	try {
		const stats = await stat(filePath);
		if (stats.isFile()) {
			res.statusCode = 404;
			res.setHeader('Content-Type', 'text/plain');
			fs.createReadStream(filePath).pipe(res);  // 也可以使用 fs.readFile
		} else if (stats.isDirectory()) {
			const filesList = await readdir(filePath);
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/html');
			const dir = path.relative(config.root, filePath);
			const data = {
				title: path.basename(filePath),
				dir: dir ? `/${dir}` : '',
				files: filesList
			};

			res.end( template(data) );
		}
	} catch (error) {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/plain');
		res.end(`${filePath} is not a directory or file`);
	}
};

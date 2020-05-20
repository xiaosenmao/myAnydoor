import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import mime from './mime';
import compress from './compress';
import range from './range';
import isFresh from './cache';
import { promisify } from 'util';  // 在 Node 8+ 中，你可以使用 util.promisify 转换一个异步函数，以返回一个 promise
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const tplPath = 'lib/template/dir.tpl';
const source = fs.readFileSync(tplPath, 'utf8');
const template= Handlebars.compile(source);

export default async function route(req, res, filePath, config) {
	try {
		const stats = await stat(filePath);
		if (stats.isFile()) {
			const contentType = mime(filePath);
			res.setHeader('Content-Type', contentType);

			if (isFresh(stats, req, res)) {
				res.statusCode = 304;
				res.end();
				return;
			}

			let rs;
			const { code, start, end } = range(stat.size, req, res);
			if (code === 200) {
				res.statusCode = 200;
				rs = fs.createReadStream(filePath);
			} else {
				// 部分内容
				res.statusCode = 206;
				rs = fs.createReadStream(filePath, {start, end});
			}
			// 尚未压缩
			if (filePath.match(config.compress)) {
				rs = compress(rs, req, res);
			}
			rs.pipe(res);

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
		console.info(error);
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/plain');
		res.end(`${filePath} is not a directory or file`);
	}
}

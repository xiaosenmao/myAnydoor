const defaultConfig = {
	root: process.cwd(),  // 当前执行的文件夹
	hostname: '127.0.0.1',
	port: 9527,
	compress: /\.(html|js|css|md)$/,
	cache: {
		maxAge: 600,
		expires: true,
		cacheControl: true,
		lastModified: true,
		etag: true
	}
};

export default defaultConfig;

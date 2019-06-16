const path = require('path');

const mimeTypes = {
	'doc': 'application/msword',
	'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'rtf ': 'application/rtf',
	'pdf': 'application/pdf',
	'swf': 'application/x-shockwave-flash',
	'dll': 'application/x-msdownload',
	'exe': 'application/octet-stream',
	'json': 'application/json',
	'wav': 'audio/wav',
	'wma': 'audio/x-ms-wma',
	'wmv': 'video/x-ms-wmv',
	'gif': 'image/gif',
	'png': 'image/png',
	'txt': 'text/plain',
	'xml': 'text/xml',
	'html': 'text/html',
	'css': 'text/css',
	'js': 'text/javascript'
};

module.exports = filePath => {
	let ext = path.extname(filePath).split('.').pop().toLowerCase();

	if (!ext) {
		ext = filePath;
	}

	return mimeTypes[ext] || mimeTypes['txt'];
};

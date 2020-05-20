export default function range(totalSize, req, res) {
	const range = req.headers['range'];
	if (!range) {
		return {code: 200};
	}

	const sizes = range.match(/bytes=(\d*)-(\d*)/);
	const end = sizes[2] || sizes[totalSize -1];
	const start = sizes[1] || sizes[totalSize - end];

	if (start > end || start < 0 || end > totalSize) {
		return {code: 200};
	}

	res.setHeander('Accept-Ranges', 'bytes');
	res.setHeander('Content-Range', `bytes ${start}-${end}/${totalSize}`);
	res.setHeander('Content-Length', end - start);
	return {
		code: 206,
		start: parseInt(start),
		end: parseInt(end)
	};
}

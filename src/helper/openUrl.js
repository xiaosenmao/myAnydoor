const { exec } = require('child_process');

module.exports = url => {
	const { platform } = process;

	if (platform === 'darwin') {
		exec(`open ${url}`);
	} else if (platform === 'win32') {
		exec(`open ${url}`);
	}
};

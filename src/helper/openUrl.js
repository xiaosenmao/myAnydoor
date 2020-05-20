import { exec } from 'child_process';

const commandMap = {
	darwin: url => exec(`open ${url}`),
	win32: url => exec(`start ${url}`)
};

export default function openUrl(url) {
	commandMap[process.platform](url);
}

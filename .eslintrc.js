module.exports = {
    "env": {
		"browser": false,
		"node": true,
		"es6": true,
		"mocha": true
    },
	"extends": "eslint:recommended",
	"parser": "babel-eslint",
    "parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "script"
	},
	"globals": {
		// "window": true
	},
    "rules": {
		"indent": [
			"error",
			4
		],
		"linebreak-style": [
			"warn",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"always"
		],
		"no-console": ["error", {
			"allow": ["warn", "error", "info"]
		}]
    }
};

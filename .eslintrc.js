module.exports = {
    "env": {
		"browser": false,
		"node": true,
		"es6": true,
		"jest": true
    },
	"extends": "eslint:recommended",
	"parser": "babel-eslint",
    "parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"globals": {
		// "window": true
	},
    "rules": {
		"indent": [
			"error",
			"tab"
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

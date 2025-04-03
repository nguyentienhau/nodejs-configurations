"use strict";

module.exports = function () {
	const env = require("./.env.json");

	for (const key in env) {
		process.env[key] = env[key];
	}
};

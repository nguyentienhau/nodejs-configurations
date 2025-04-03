const fs = require("fs");
const path = require("path");

module.exports = fs
	.readdirSync(__dirname)
	.filter(function (fileName = "") {
		const extensionIndex = fileName.lastIndexOf(".");
		return fileName !== path.basename(__filename) && extensionIndex > 0 && extensionIndex < fileName.length - 1;
	})
	.reduce(function (accumulator = {}, fileName = "") {
		const extensionIndex = fileName.lastIndexOf(".");
		const filePath = path.resolve(__dirname, fileName);
		const name = fileName.slice(0, extensionIndex).toPascalCase();
		accumulator[`${name}Configuration`] = require(filePath);
		return accumulator;
	}, {});

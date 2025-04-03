"use strict";

const { Role } = require("../models");
const { serviceHelpers } = require("../helpers");

module.exports = serviceHelpers.createBasicServices(Role, function (data = {}) {
	return Object.entries(data).reduce(function (result = {}, entry = []) {
		const [key = "", value = ""] = entry;

		if (value !== null && value !== undefined) {
			if (
				(["id"].includes(key) && value.isNumber() && value > 0) ||
				(["name"].includes(key) && value.isString()) ||
				(["permissions"].includes(key) && value.isArray())
			) {
				result[key] = value;
			}
		}

		return result;
	}, {});
});

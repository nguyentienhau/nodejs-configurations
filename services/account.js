"use strict";

const { Account } = require("../models");
const { serviceHelpers } = require("../helpers");

module.exports = serviceHelpers.createBasicServices(Account, function (data = {}) {
	return Object.entries(data).reduce(function (result = {}, entry = []) {
		const [key = "", value = ""] = entry;

		if (value !== null && value !== undefined) {
			if (
				(["id", "roleId"].includes(key) && value.isNumber() && value > 0) ||
				(["status"].includes(key) && value.isNumber()) ||
				(["email"].includes(key) && value.isString() && value.isEmail()) ||
				(["password", "fullName"].includes(key) && value.isString())
			) {
				result[key] = value;
			}
		}

		return result;
	}, {});
});

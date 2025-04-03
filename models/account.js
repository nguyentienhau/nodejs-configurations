"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class Account extends Model {
		static associate(_models) {}
	}

	Account.init(
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			role: DataTypes.TINYINT,
			status: DataTypes.TINYINT,
			fullName: DataTypes.STRING
		},
		{ sequelize, modelName: "Account", tableName: "account", underscored: true }
	);

	return Account;
};

"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class Account extends Model {
		static associate(_models) {
			// define association here
		}
	}

	Account.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				defaultValue: ""
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			role: {
				type: DataTypes.ENUM,
				values: ["user", "admin"],
				allowNull: false,
				defaultValue: "user"
			},
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			fullName: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			}
		},
		{ sequelize, modelName: "Account", tableName: "account", underscored: true }
	);

	return Account;
};

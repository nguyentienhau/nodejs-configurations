"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize = {}) {
	class Role extends Model {
		static associate(models = {}) {
			this.hasMany(models["Account"], { foreignKey: "roleId", as: "accounts" });
		}
	}

	Role.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			permissions: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: []
			}
		},
		{ sequelize, modelName: "Role", tableName: "role", underscored: true }
	);

	return Role;
};

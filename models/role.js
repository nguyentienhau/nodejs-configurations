const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize = {}) {
	class RoleModel extends Model {
		static associate(models = {}) {
			this.hasMany(models["AccountModel"], { foreignKey: "roleId", as: "accounts" });
		}
	}

	RoleModel.init(
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
		{ sequelize, modelName: "RoleModel", tableName: "role", underscored: true }
	);

	return RoleModel;
};

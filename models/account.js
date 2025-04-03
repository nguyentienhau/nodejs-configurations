const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize = {}) {
	class AccountModel extends Model {
		static associate(models = {}) {
			this.belongsTo(models["RoleModel"], { foreignKey: "roleId", as: "role" });
		}
	}

	AccountModel.init(
		{
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
			roleId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1
			},
			status: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 0
			},
			fullName: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			}
		},
		{ sequelize, modelName: "AccountModel", tableName: "account", underscored: true }
	);

	return AccountModel;
};

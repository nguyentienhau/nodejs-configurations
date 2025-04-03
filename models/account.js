const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize = {}) {
	class Account extends Model {
		static associate(models = {}) {
			this.belongsTo(models["Role"], { foreignKey: "roleId", as: "role" });
		}
	}

	Account.init(
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
		{ sequelize, modelName: "Account", tableName: "account", underscored: true }
	);

	return Account;
};

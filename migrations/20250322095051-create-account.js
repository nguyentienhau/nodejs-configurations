"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("account", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
				defaultValue: ""
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			role: {
				type: Sequelize.ENUM,
				values: ["user", "admin"],
				allowNull: false,
				defaultValue: "user"
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			full_name: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			}
		});
	},
	async down(queryInterface, _Sequelize) {
		await queryInterface.dropTable("account");
	}
};

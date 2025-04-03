module.exports = {
	async up(queryInterface = {}, Sequelize = {}) {
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
			role_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 1,
				references: { model: "role", key: "id" },
				onUpdate: "SET DEFAULT",
				onDelete: "SET DEFAULT"
			},
			status: {
				type: Sequelize.TINYINT,
				allowNull: false,
				defaultValue: 0
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
	async down(queryInterface = {}, _Sequelize = {}) {
		await queryInterface.dropTable("account");
	}
};

module.exports = {
	async up(queryInterface, _Sequelize) {
		const tableName = "role";
		const names = ["Guest", "User", "Admin"];
		const roles = names.map((name) => ({ name, permissions: "[]" }));
		await queryInterface.bulkInsert(tableName, roles, {});
	},
	async down(queryInterface, Sequelize) {
		const tableName = "role";
		const names = ["Guest", "User", "Admin"];
		const nameCondition = { [Sequelize.Op.in]: names };
		await queryInterface.bulkDelete(tableName, { name: nameCondition }, {});
	}
};

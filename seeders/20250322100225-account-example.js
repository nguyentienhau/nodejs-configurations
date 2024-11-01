"use strict";

module.exports = {
	async up(queryInterface, _Sequelize) {
		const tableName = "account";
		const emails = ["test@example.com"];
		const accounts = emails.map((email) => ({ email }));
		await queryInterface.bulkInsert(tableName, accounts, {});
	},
	async down(queryInterface, Sequelize) {
		const tableName = "account";
		const emails = ["test@example.com"];
		const emailCondition = { [Sequelize.Op.in]: emails };
		await queryInterface.bulkDelete(tableName, { email: emailCondition }, {});
	}
};

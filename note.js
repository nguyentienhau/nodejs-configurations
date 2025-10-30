const Sequelize = require("sequelize");

const config = {};
const _sequelize = new Sequelize(config.database.dbName, config.database.master.user, config.database.master.password, {
	dialect: config.database.protocol,
	port: config.database.port,
	host: config.database.master.host,
	replication: {
		read: [
			{
				host: config.database.master.host,
				username: config.database.master.host,
				password: config.database.master.password
			},
			{
				host: config.database.master.host,
				username: config.database.master.host,
				password: config.database.master.password
			}
		],
		write: {
			host: config.database.master.host,
			username: config.database.master.host,
			password: config.database.master.password
		}
	},
	pool: {
		maxConnections: config.database.pool.maxConnections,
		maxIdleTime: config.database.pool.maxIdleTime
	},
	logging: false,
	define: {
		underscored: false,
		freezeTableName: false,
		syncOnAssociation: true,
		charset: "utf8",
		collate: "utf8_general_ci",
		classMethods: {
			method1: function () {}
		},
		instanceMethods: {
			method2: function () {}
		},
		timestamps: true,
		schema: "prefix"
	}
});

const { Op } = require("sequelize");
const SequelizeHelper = require("./sequelize");

module.exports = {
	createBasicService(model = {}) {
		return {
			read: async function (data = []) {
				try {
					if (Array.isArray(data)) {
						data = data.map((item) => SequelizeHelper.getInstanceData(model, item));
						const options = data.length > 0 ? { where: { [Op.or]: data } } : {};
						const result = await model.findAll(options);
						return { success: true, data: result, message: "Read successfully" };
					} else {
						return { success: false, message: "Invalid data" };
					}
				} catch (error) {
					return { success: false, error, message: "Read failed" };
				}
			},
			upsert: async function (data = []) {
				try {
					if (Array.isArray(data)) {
						data = data.map((item) => SequelizeHelper.getInstanceData(model, item));
						const options = { updateOnDuplicate: ["id"] };
						const result = await model.bulkCreate(data, options);
						return { success: true, data: result, message: "Save successfully" };
					} else {
						return { success: false, message: "Invalid data" };
					}
				} catch (error) {
					return { success: false, error, message: "Save failed" };
				}
			},
			delete: async function (data = []) {
				try {
					if (Array.isArray(data)) {
						data = data.map((item) => SequelizeHelper.getInstanceData(model, item));
						const options = data.length > 0 ? { where: { [Op.or]: data } } : {};
						const result = await model.destroy(options);
						return { success: true, data: result, message: "Delete successfully" };
					} else {
						return { success: false, message: "Invalid data" };
					}
				} catch (error) {
					return { success: false, error, message: "Delete failed" };
				}
			}
		};
	}
};

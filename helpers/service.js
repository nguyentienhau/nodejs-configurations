const { Op } = require("sequelize");

module.exports = {
	createBasicServices(model = {}, getItemData = () => {}) {
		return {
			read: async function (data = []) {
				try {
					if (data && data.isArray()) {
						const options = data.length > 0 ? { where: { [Op.or]: data.map(getItemData) } } : {};
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
					if (data && data.isArray()) {
						const options = { updateOnDuplicate: ["id"] };
						const result = await model.bulkCreate(data.map(getItemData), options);
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
					if (data && data.isArray()) {
						const options = data.length > 0 ? { where: { [Op.or]: data.map(getItemData) } } : {};
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

module.exports = {
	getInstanceData(model = {}, data = {}) {
		return Object.values(model.rawAttributes)
			.filter(function (item = {}) {
				return !["createdAt", "updatedAt"].includes(item.fieldName);
			})
			.map(function (item = {}) {
				return item.autoIncrement ? { ...item, defaultValue: 1 } : item;
			})
			.reduce(function (result = {}, modelField = {}) {
				const value = data[modelField.fieldName];

				if (
					(value || [0, "", false].includes(value)) &&
					value.constructor === modelField.defaultValue.constructor &&
					(value.constructor !== Number || !modelField.fieldName.toLowerCase().endsWith("id") || value > 0)
				) {
					result[modelField.fieldName] = value;
				}

				return result;
			}, {});
	}
};

module.exports = {
	getInstanceData(model = {}, data = {}) {
		return Object.values(model.rawAttributes).reduce(function (result = {}, modelField = {}) {
			const value = data[modelField.fieldName];

			if (
				(value || value === 0 || value === "" || value === false) &&
				value.constructor === modelField.defaultValue.constructor &&
				(value.constructor !== Number || !modelField.fieldName.toLowerCase().endsWith("id") || value > 0)
			) {
				result[modelField.fieldName] = value;
			}

			return result;
		}, {});
	}
};

[
	{
		target: Object,
		name: "deepCopy",
		value: function (source = {}) {
			if (!source) return source;
			switch (source.constructor) {
				case Symbol: {
					const constructorParams = ["description"].map((key) => Object.deepCopy(source[key]));
					return Symbol(...constructorParams);
				}
				case RegExp: {
					const constructorParams = ["source", "flags"].map((key) => Object.deepCopy(source[key]));
					const result = new RegExp(...constructorParams);
					return ["lastIndex"].reduce(function (accumulator, key) {
						accumulator[key] = Object.deepCopy(source[key]);
						return accumulator;
					}, result);
				}
				case Array: {
					return source.map(Object.deepCopy);
				}
				case Set: {
					const keys = Array.from(source.keys());
					return new Set(Object.deepCopy(keys));
				}
				case Map: {
					return Array.from(source.entries()).reduce(function (result, entry) {
						const key = Object.deepCopy(entry[0]);
						result.set(key, Object.deepCopy(entry[1]));
						return result;
					}, new Map());
				}
				case Object: {
					return Object.entries(source).reduce(function (result, entry) {
						const key = Object.deepCopy(entry[0]);
						result[key] = Object.deepCopy(entry[1]);
						return result;
					}, {});
				}
				default: {
					return source;
				}
			}
		}
	},
	{
		target: Object,
		name: "deepEqual",
		value: function (source = {}, target = {}) {
			if (source === target) return true;
			if (!source || !target || source.constructor !== target.constructor) return false;
			switch (source.constructor) {
				case Symbol: {
					const keys = ["description"];
					return keys.every((key) => Object.deepEqual(source[key], target[key]));
				}
				case RegExp: {
					const keys = ["source", "flags", "lastIndex"];
					return keys.every((key) => Object.deepEqual(source[key], target[key]));
				}
				case Array: {
					if (source.length !== target.length) return false;
					return source.every((item, index) => Object.deepEqual(item, target[index]));
				}
				case Set: {
					if (source.size !== target.size) return false;
					const sourceItems = Array.from(source.keys());
					const targetItems = Array.from(target.keys());
					return sourceItems.every(function (sourceItem) {
						return targetItems.some((item) => Object.deepEqual(sourceItem, item));
					});
				}
				case Map: {
					if (source.size !== target.size) return false;
					const sourceKeys = Array.from(source.keys());
					const targetKeys = Array.from(target.keys());
					return sourceKeys.every(function (sourceKey) {
						return targetKeys.some(function (targetKey) {
							const checkKey = Object.deepEqual(sourceKey, targetKey);
							const sourceValue = source.get(sourceKey);
							const targetValue = target.get(targetKey);
							return checkKey && Object.deepEqual(sourceValue, targetValue);
						});
					});
				}
				case Object: {
					const sourceKeys = Object.keys(source);
					const targetKeys = Object.keys(target);
					if (sourceKeys.length !== targetKeys.length) return false;
					return sourceKeys.every(function (sourceKey) {
						return targetKeys.some(function (targetKey) {
							const checkKey = Object.deepEqual(sourceKey, targetKey);
							const sourceValue = source[sourceKey];
							const targetValue = target[targetKey];
							return checkKey && Object.deepEqual(sourceValue, targetValue);
						});
					});
				}
				default: {
					return false;
				}
			}
		}
	},
	{
		target: String.prototype,
		name: "toCapitalCase",
		value: function () {
			const regexp = /(\b|\/|[.,;: ])([a-z])/g;
			return this.replace(regexp, function (_match = "", digit = "", letter = "") {
				return digit + letter.toUpperCase();
			});
		}
	},
	{
		target: String.prototype,
		name: "toPascalCase",
		value: function () {
			const regexp = /(\b|\/|[-.,;:_ ])([a-z])/g;
			return this.replace(regexp, function (_match = "", _digit = "", letter = "") {
				return letter.toUpperCase();
			});
		}
	},
	{
		target: String.prototype,
		name: "toCamelCase",
		value: function () {
			const regexp = /(\/|[-.,;:_ ])([a-z])/g;
			return this.replace(regexp, function (_match = "", _digit = "", letter = "") {
				return letter.toUpperCase();
			}).replace(/\b([A-Z])/, function (_match = "", letter = "") {
				return letter.toLowerCase();
			});
		}
	},
	{
		target: String.prototype,
		name: "toSnakeCase",
		value: function () {
			const regexp = /(.?)([A-Z])/g;
			return this.replace(regexp, function (_match = "", digit = "", letter = "") {
				return (digit ? digit + "_" : "") + letter.toLowerCase();
			});
		}
	},
	{
		target: String.prototype,
		name: "format",
		value: function (data = {}) {
			if (!data || data.constructor !== Object) return this;
			const regexp = /{([A-Za-z0-9-.,;:_ ]+)}/g;
			return this.replace(regexp, function (_match = "", keyString = "") {
				return keyString.split(".").reduce(function (value = {}, key = "") {
					return Object.hasOwn(value, key) ? value[key] : value;
				}, data);
			});
		}
	},
	{
		target: String.prototype,
		name: "isEmail",
		value: function () {
			const regexp =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return regexp.test(this);
		}
	},
	{
		target: String.prototype,
		name: "isPhoneNumber",
		value: function () {
			const regexp = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s/0-9]*$/;
			return regexp.test(this);
		}
	},
	{
		target: String.prototype,
		name: "isHexColor",
		value: function () {
			const regexp = /^#([0-9a-fA-F]{3}){1,2}$/;
			return regexp.test(this);
		}
	}
].forEach(function (item = {}) {
	if (Object.hasOwn(item.target, item.name)) return;
	const data = { value: item.value, configurable: false, enumerable: false, writable: false };
	Object.defineProperty(item.target, item.name, data);
});

[Number, Boolean, String, BigInt, Symbol, RegExp, Object, Array, Set, Map, Function].forEach(function (dataType = {}) {
	const methodName = "is" + dataType.name;
	if (Object.hasOwn(dataType, methodName)) return;
	Object.defineProperty(dataType, methodName, {
		configurable: false,
		enumerable: false,
		writable: false,
		value: function (data = null) {
			return (data || [0, "", false].includes(data)) && data.constructor === dataType;
		}
	});
});

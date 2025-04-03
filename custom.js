[
	{
		target: Object.prototype,
		name: "deepCopy",
		value: function () {
			switch (this.constructor) {
				case Symbol: {
					const source = this;
					const constructorParams = ["description"].map(function (key = "") {
						return source[key] && source[key].deepCopy();
					});
					return Symbol(...constructorParams);
				}
				case RegExp: {
					const source = this;
					const constructorParams = ["source", "flags"].map(function (key = "") {
						return source[key] && source[key].deepCopy();
					});

					return ["lastIndex"].reduce(
						function (accumulator = {}, key = "") {
							accumulator[key] = source[key] && source[key].deepCopy();
							return accumulator;
						},
						new RegExp(...constructorParams)
					);
				}
				case Array: {
					return this.map((item = {}) => item && item.deepCopy());
				}
				case Set: {
					const keys = Array.from(this.keys());
					return new Set(keys.deepCopy());
				}
				case Map: {
					const result = new Map();

					this.forEach(function (value = {}, key = "") {
						const resultKey = key && key.deepCopy();
						const resultValue = value && value.deepCopy();
						result.set(resultKey, resultValue);
					});

					return result;
				}
				case Object: {
					const result = {};

					for (const key in this) {
						const resultKey = key && key.deepCopy();
						const resultValue = this[resultKey] && this[resultKey].deepCopy();
						result[resultKey] = resultValue;
					}

					return result;
				}
				default: {
					return this;
				}
			}
		}
	},
	{
		target: Object.prototype,
		name: "equalTo",
		value: function (target = {}) {
			if (this === target) {
				return true;
			} else if (target && this.constructor === target.constructor) {
				switch (this.constructor) {
					case Symbol: {
						const source = this;

						return ["description"].every(function (key = "") {
							if (source[key]) {
								return source[key].equalTo(target[key]);
							}

							return source[key] === target[key];
						});
					}
					case RegExp: {
						const source = this;

						return ["source", "flags", "lastIndex"].every(function (key = "") {
							if (source[key]) {
								return source[key].equalTo(target[key]);
							}

							return source[key] === target[key];
						});
					}
					case Array: {
						if (this.length === target.length) {
							return this.every(function (sourceItem = {}, index = 0) {
								if (sourceItem) {
									return sourceItem.equalTo(target[index]);
								}

								return sourceItem === target[index];
							});
						}

						return false;
					}
					case Set: {
						if (this.size === target.size) {
							const sourceItems = Array.from(this.keys());
							const targetItems = Array.from(target.keys());

							return sourceItems.every(function (sourceItem = {}) {
								if (sourceItem) {
									return targetItems.some((targetItem = {}) => sourceItem.equalTo(targetItem));
								}

								return target.has(sourceItem);
							});
						}

						return false;
					}
					case Map: {
						if (this.size === target.size) {
							const source = this;
							const sourceKeys = Array.from(this.keys());

							return sourceKeys.every(function (key = "") {
								if (target.has(key)) {
									const sourceValue = source.get(key);
									const targetValue = target.get(key);

									if (sourceValue) {
										return sourceValue.equalTo(targetValue);
									}

									return sourceValue === targetValue;
								}

								return false;
							});
						}

						return false;
					}
					case Object: {
						const source = this;
						const sourceKeys = Object.keys(this);
						const targetKeys = Object.keys(target);

						if (sourceKeys.length === targetKeys.length) {
							return sourceKeys.every(function (key = "") {
								if (Object.hasOwn(target, key)) {
									if (source[key]) {
										return source[key].equalTo(target[key]);
									}

									return source[key] === target[key];
								}

								return false;
							});
						}

						return false;
					}
				}
			}

			return false;
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
			const regexp = /(\b|\/|[.,;:-_ ])([a-z])/g;
			return this.replace(regexp, function (_match = "", _digit = "", letter = "") {
				return letter.toUpperCase();
			});
		}
	},
	{
		target: String.prototype,
		name: "toCamelCase",
		value: function () {
			const regexp = /(\/|[.,;:-_ ])([a-z])/g;
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
			if (data && data.constructor === Object) {
				const regexp = /{([A-Za-z0-9.,;:-_ ]+)}/g;
				return this.replace(regexp, function (_match = "", keyString = "") {
					return keyString.split(".").reduce(function (value = {}, key = "") {
						return Object.hasOwn(value, key) ? value[key] : value;
					}, data);
				});
			} else {
				return this;
			}
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
	const data = { value: item.value, configurable: false, enumerable: false, writable: false };
	Object.defineProperty(item.target, item.name, data);
});

[Number, Boolean, String, BigInt, Symbol, RegExp, Object, Array, Set, Map, Function].forEach(function (dataType = {}) {
	Object.defineProperty(Object.prototype, "is" + dataType.name, {
		configurable: false,
		enumerable: false,
		writable: false,
		value: function () {
			return this.constructor === dataType;
		}
	});
});

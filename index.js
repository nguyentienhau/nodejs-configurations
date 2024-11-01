const numberKeys = ["age"];
const booleanKeys = [];
const data = process.argv.reduce(function (accumulator, item) {
	if (item.startsWith("--")) {
		const splitIndex = item.indexOf("=");

		if (splitIndex > 2 && splitIndex < item.length - 1) {
			const key = item.slice(2, splitIndex);
			let value = item.slice(splitIndex + 1);

			if (numberKeys.includes(key)) {
				value = Number(value);
			} else if (booleanKeys.includes(key)) {
				value = value === "true" ? true : false;
			}

			accumulator[key] = value;
		}
	}

	return accumulator;
}, {});

console.log(data);

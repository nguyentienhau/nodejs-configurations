const env = require("./.env.json");

for (const key in env) {
	process.env[key] = env[key];
}

const numberKeys = [];
const booleanKeys = [];

process.argv.forEach(function (item = "") {
	if (item && item.isString()) {
		const splitIndex = item.indexOf("=");

		if (splitIndex > 0 && splitIndex < item.length - 1) {
			const key = item.slice(0, splitIndex);
			let value = item.slice(splitIndex + 1);

			if (numberKeys.includes(key)) {
				value = Number(value);
			} else if (booleanKeys.includes(key)) {
				value = value === "true" ? true : false;
			}

			process.env[key] = value;
		}
	}
});

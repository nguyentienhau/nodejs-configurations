const fs = require("fs");
const https = require("https");

https
	.createServer(
		{
			key: fs.readFileSync("./server.key"),
			cert: fs.readFileSync("./server.cert")
		},
		function (request, response) {
			response.writeHead(200, { "content-type": "application/json" });
			response.write(JSON.stringify({ test: "test" }));
			response.end();
		}
	)
	.listen(5000);

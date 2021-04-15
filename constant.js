const config = require("config");

const NODE_ENV = process.env.NODE_ENV || "dev";
const ENV_NAME = config.get("envName");
const PORT = process.env.PORT || 3003;
const connectionURL = config.get("connectionUri");

module.exports = { ENV_NAME, NODE_ENV, PORT, connectionURL };

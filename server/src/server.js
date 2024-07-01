const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const { saveCountriesToDB } = require("./utils/saveApiDb");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

saveCountriesToDB();

server.use(router);

module.exports = server;

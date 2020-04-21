const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require("./users/users-router.js");
const registerRouter = require("./register.js");
const loginRouter = require("./login.js");

const authenticator = require("./authenticator.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", authenticator, usersRouter);
server.use("/api/register", registerRouter);
server.use("/api/login", loginRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;

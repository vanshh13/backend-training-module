const config = require("./config")
const express = require("express");
const app = express();
// const cors = require("cors"); // cros-origin request
const bodyParser = require("body-parser");
const router = require('./routes');
const { randomUUID } = require("node:crypto");
const session = require("express-session");


const pino = require("pino");    // pino is for fast JSON logs, more faster then console.log because of that it's used in production
const loggerMiddleware = require("pino-http");  // purpose is to automtically logs every http request 
const logger = pino.pino();
const startDeleteSoftUsersCron = require("./cron/delete-soft-users.cron");
const userUseCases = require("./usecase/user")

app.use(bodyParser.json());
app.use(
  loggerMiddleware({
    logger: pino(),
    useLevel: "info",
  }),
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "hsd87sd8asd78sa9dsa8dasd9asdasd",   // ONE secret for entire app
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true in production over HTTPS
      maxAge: 1000 * 60 * 60, // 1 hour
    }
  })
);


startDeleteSoftUsersCron({
    hardDeleteSoftUsers: userUseCases.hardDeleteSoftUsers
});

app.use(`/${config.service.endpoint}`, router);


module.exports = {
    app,
    logger,
};
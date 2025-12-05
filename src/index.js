const {app, logger} = require("./app");
const http = require("http");
const config = require("./config");

// server creation 
const server = http.createServer(app);

server.listen(config.service.port, config.service.host, ()=>{
      logger.info(`Server started at ${config.service.host}:${config.service.port}`);
});
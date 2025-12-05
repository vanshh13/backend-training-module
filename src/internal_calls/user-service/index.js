const axios = require('axios');
const config = require('../../config'); 
const sessionAuth =require("./session-auth");
const isAdmin = require('./isAdmin');
const makeCheckPermission = require('./check-permission');
module.exports = {
    sessionAuth,
    isAdmin,
    makeCheckPermission,
}
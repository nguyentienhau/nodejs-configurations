const { RoleModel } = require("../models");
const { ServiceHelper } = require("../helpers");

module.exports = ServiceHelper.createBasicServices(RoleModel);

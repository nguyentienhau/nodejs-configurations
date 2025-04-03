const { ServiceHelper } = require("../helpers");
const { RoleModel } = require("../models");

module.exports = ServiceHelper.createBasicService(RoleModel);

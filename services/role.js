const { RoleModel } = require("../models");
const { ServiceHelper } = require("../helpers");

module.exports = ServiceHelper.createBasicService(RoleModel);

const { AccountModel } = require("../models");
const { ServiceHelper } = require("../helpers");

module.exports = ServiceHelper.createBasicServices(AccountModel);

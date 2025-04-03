const { ServiceHelper } = require("../helpers");
const { AccountModel } = require("../models");

module.exports = ServiceHelper.createBasicService(AccountModel);

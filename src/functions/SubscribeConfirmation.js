'use strict';

const HashUtil = require("../utils/HashUtil");
const Producer = require("../queue/Producer");
const NotifyRepository = require("../Repository/NotifyRepository");
const NotifyService = require("../services/NotifyService");

const notifyService = new NotifyService(new NotifyRepository(), HashUtil, new Producer());

module.exports.main = async event => {
  const { hash } = event.pathParameters;
  await notifyService.confirmSubscribe(hash);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Subscribe confirmated success!"
    })
  }
};

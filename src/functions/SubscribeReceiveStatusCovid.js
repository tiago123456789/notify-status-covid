'use strict';

const HashUtil = require("../utils/HashUtil");
const Producer = require("../queue/Producer");
const NotifyRepository = require("../Repository/NotifyRepository");
const NotifyService = require("../services/NotifyService");
const subscribeNotifyValidation = require("../validations/SubscribeNotifyValidation");

const notifyService = new NotifyService(new NotifyRepository(), HashUtil, new Producer());

module.exports.main = async event => {
  const newSubscribe = JSON.parse(event.body);
  const errors = subscribeNotifyValidation(newSubscribe);

  const isExistErrors = errors.length > 0
  if (isExistErrors) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        errors: errors
      })
    }
  }

  await notifyService.subscribe(newSubscribe);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Operation execute success. Check your email our send link confirmation for you!"
    })
  }
};

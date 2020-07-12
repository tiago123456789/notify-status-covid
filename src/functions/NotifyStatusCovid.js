'use strict';

const HashUtil = require("../utils/HashUtil");
const Producer = require("../queue/Producer");
const NotifyRepository = require("../Repository/NotifyRepository");
const NotifyService = require("../services/NotifyService");
const EmailNotification = require("../notification/EmailNotification");
const SmsNotification = require("../notification/SmsNotification");
const httpClient = require("../utils/HttpClientUtil");

const notifyService = new NotifyService(new NotifyRepository(), HashUtil, new Producer());
const emailNotification = new EmailNotification(notifyService);
const smsNotification = new SmsNotification(notifyService, httpClient);

module.exports.main = async event => {
  const messages = JSON.parse(event.Records[0].body);
  await emailNotification.notify(messages);
  await smsNotification.notify(messages);
};

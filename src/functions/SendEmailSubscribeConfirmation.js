'use strict';

const SubscribeConfirmationNotification = require("../notification/SubscribeConfirmationNotification");
const subscribeConfirmationNotification = new SubscribeConfirmationNotification();

module.exports.main = async event => {
  const messageBody = JSON.parse(event.Records[0].body);
  await subscribeConfirmationNotification.notify(messageBody);
};

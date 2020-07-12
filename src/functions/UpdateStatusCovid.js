'use strict';

const HealthSecretaryRepository = require("../Repository/HealthSecretaryRepository");
const StatusCovidRepository = require("../Repository/StatusCovidRepository");
const StatusCovidService = require("../services/StatusCovidService");
const ProducerMessageQueue = require("../queue/Producer");
const statusCovidService = new StatusCovidService(
    new HealthSecretaryRepository(), new StatusCovidRepository(), 
    new ProducerMessageQueue()
);

module.exports.main = async event => {
  await statusCovidService.update();
};

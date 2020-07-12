const aws = require("aws-sdk");
const sqs = new aws.SQS();

module.exports = sqs;
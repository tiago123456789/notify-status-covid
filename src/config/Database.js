const aws = require("aws-sdk");
const dynamo = new aws.DynamoDB.DocumentClient({ apiVersion: '2012-08-10'});

module.exports = dynamo;
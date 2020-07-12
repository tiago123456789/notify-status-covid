const sqs = require("../config/Sqs");

class Producer {

    publishInNotificationStatusCovidQueue(message) {
        return new Promise((resolve, reject) => {
            sqs.sendMessage({
                QueueUrl: process.env.NOTIFICATION_STATUS_COVID,
                MessageBody: JSON.stringify(message)
            }, (error, data) => {
                if (error) reject(error);
                else resolve(data);
            });
        });
    }

    publishInSubscribeConfirmationQueue(message) {
        return new Promise((resolve, reject) => {
            sqs.sendMessage({
                QueueUrl: process.env.SUBSCRIBE_CONFIRMATION_QUEUE_URL,
                MessageBody: JSON.stringify(message)
            }, (error, data) => {
                if (error) reject(error);
                else resolve(data);
            });
        });
    }

}

module.exports = Producer;
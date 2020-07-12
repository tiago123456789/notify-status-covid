const Notification = require("./Notification");
const Email = require("../email/Email");

class SubscribeConfirmationNotification extends Notification {

    constructor(notifyService) {
        super();
    }

    async notify(message) {
        const link = process.env.URL_SUBSCRIBE_CONFIRMATION_NOTIFY_STATUS_COVID + message.hash

        await new Email()
            .withSubject("Email de confirmação para receber notificações sobre covid-19")
            .withTo(message.email)
            .withName(message.name)
            .withHtml(`Clique no link: <a href=${link}>link</a>`)
            .send()
    }
}

module.exports = SubscribeConfirmationNotification;
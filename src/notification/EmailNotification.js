const Notification = require("./Notification");
const Email = require("../email/Email");

class EmailNotification extends Notification {

    constructor(notifyService) {
        super();
        this._notifyService = notifyService;
    }

    async notify(messages) {
        for (let indice = 0; indice < messages.length; indice++) {
            const message = messages[indice];
            const city = message.municipio_residencia;
            const subscribesNotifySpecificCity = await this._notifyService.findByCity(city);
            if (subscribesNotifySpecificCity && subscribesNotifySpecificCity.Items) {
                for (let indice2 = 0; indice2 < subscribesNotifySpecificCity.Items.length; indice2++) {
                    const item = subscribesNotifySpecificCity.Items[indice2];
                    await new Email()
                        .withSubject(`Situação atual sobre covid em ${city}`)
                        .withTo(item.email)
                        .withName(item.name)
                        .withHtml(`Case confirmated: ${message.casos_confirmados}.
                  \n Deaths confirmated: ${message.obitos_confirmados}`)
                        .send()
                }
            }
        }
    }
}

module.exports = EmailNotification;
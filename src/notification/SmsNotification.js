const Notification = require("./Notification");


class SmsNotification extends Notification {

    constructor(notifyService, httpClient) {
        super();
        this._notifyService = notifyService;
        this._httpClient = httpClient;
    }

    async notify(messages) {
        for (let indice = 0; indice < messages.length; indice++) {
            const message = messages[indice];
            const city = message.municipio_residencia;
            const subscribesNotifySpecificCity = await this._notifyService.findByCity(city);
            if (subscribesNotifySpecificCity && subscribesNotifySpecificCity.Items) {
                for (let indice2 = 0; indice2 < subscribesNotifySpecificCity.Items.length; indice2++) {
                    const item = subscribesNotifySpecificCity.Items[indice2];
                    
                    await this._httpClient.post(
                        process.env.ENDPOINT_SMS_TOTAL_VOICE, 
                        {
                            "numero_destino": item.whasapp,
                            "mensagem": `Case confirmated: ${message.casos_confirmados}. Deaths confirmated: ${message.obitos_confirmados}`
                        },
                        { "Access-Token": process.env.ACCESS_TOKEN }
                    );
                }
            }
        }
    }
}

module.exports = SmsNotification;
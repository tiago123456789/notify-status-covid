class StatusCovidService {

    constructor(healthSecretaryRepository, statusCovidRepository, producerMessageQueue) {
        this._healthSecretaryRepository = healthSecretaryRepository;
        this._statusCovidRepository = statusCovidRepository;
        this._producerMessageQueue = producerMessageQueue;
    }

    async update() {
        const datas = await this._healthSecretaryRepository.getStatusCovid();
        await this._producerMessageQueue.publishInNotificationStatusCovidQueue(datas);
        return this._statusCovidRepository.insertBatch(datas);
    }
}

module.exports = StatusCovidService;
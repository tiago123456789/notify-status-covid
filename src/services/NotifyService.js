class NotifyService {

    constructor(notifyRepository, hashUtil, producerMessageQueue) {
        this._notifyRepository = notifyRepository;
        this._hashUtil = hashUtil;
        this._producerMessageQueue = producerMessageQueue;
    }

    findByCity(city) {
        return this._notifyRepository.findByCity(city);
    }

    async subscribe(register) {
        register.hash = this._hashUtil.uuid();
        register.id = this._hashUtil.uuid();
        register.is_confirmated = false;
        await this._notifyRepository.subscribe(register);
        const message = {
            hash: register.hash,
            email: register.email,
            name: register.name
        };
        await this._producerMessageQueue.publishInSubscribeConfirmationQueue(message);
    }

    async confirmSubscribe(hash) {
        const register  = await this._notifyRepository.findByHash(hash);
        if (!register) {
            return;
        }

        return this._notifyRepository.confirmSubscribe(register.Items[0].id);
    }
}

module.exports = NotifyService;
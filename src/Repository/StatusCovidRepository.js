const database = require("../config/Database");
const hashUtils = require("../utils/HashUtil");

class StatusCovidRepository {

    constructor() {
        this._table = "status_covid";
        this._database = database;
    }

    _insert25Items(registers) {
        return new Promise((resolve, reject) => {
            this._database.batchWrite({
                RequestItems: {
                    [this._table]: registers
                }
            }, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    async insertBatch(registers) {
        registers = registers.map(item => {
            return { "PutRequest": { Item: {...item, id: hashUtils.uuid() } } };
        });

        let registersProcessInBatch = [];
        let counter = 1;
        for (let indice = 0; indice < registers.length; indice++) {

            const isEqual25 = counter == 25;
            if (isEqual25) {
                await this._insert25Items(registersProcessInBatch);
                registersProcessInBatch = [];
                counter = 0;
            } else {
                registersProcessInBatch.push(registers[indice]);
                counter++;
            }
        }
    }
}

module.exports = StatusCovidRepository;
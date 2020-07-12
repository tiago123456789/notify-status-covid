const request = require("request");
const csv = require("convert-csv-to-json");
const fs = require("fs")
const DateUtils = require("../utils/DateUtils");

class HealthSecretaryRepository {


    constructor() {
        this._pathCsv = "/tmp/csv.txt";
        this._writeStream = fs.createWriteStream(this._pathCsv);
    }

    getStatusCovid() {
        return new Promise((resolve, reject) => {
            request(process.env.URL_CSV_HEALTH_SECRETARY)
            .pipe(this._writeStream)
            .on('finish', () => {
                const datas = csv.getJsonFromCsv(this._pathCsv);
                resolve(datas.map((data) => {
                    return { 
                        ...data,
                        createdAt: DateUtils.getCurrentDateInFormatYearMonthDay() 
                    }
                }));
            })
            .on("error", (error) => reject(error))
        })
        
    }
}

module.exports = HealthSecretaryRepository;
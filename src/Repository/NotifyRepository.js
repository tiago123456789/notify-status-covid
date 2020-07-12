const database = require("../config/Database");

class NotifyRepository {

    constructor() {
        this._table = "subscribes_notify";
        this._database = database;
    }

    findByCity(city) {
        return new Promise((resolve, reject) => {
            this._database.scan({
                TableName: this._table,
                FilterExpression : '#city = :city',
                ExpressionAttributeNames: {
                    "#city": "city"
                },
                ExpressionAttributeValues: {
                  ':city': city
                }
            }, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    findByHash(hash) {
        return new Promise((resolve, reject) => {
            this._database.scan({
                TableName: this._table,
                FilterExpression : '#param = :hash',
                ExpressionAttributeNames: {
                    "#param": "hash"
                },
                ExpressionAttributeValues: {
                  ':hash': hash
                }
            }, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }


    subscribe(register) {
        return new Promise((resolve, reject) => {
            this._database.put({
                TableName: this._table,
                Item: register
            }, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    confirmSubscribe(id) {
        return new Promise((resolve, reject) => {
            this._database.update({
                ExpressionAttributeValues: {
                    ":is_confirmated": true,
                    ":id": id 
                },
                ConditionExpression: "id = :id",
                UpdateExpression: "Set is_confirmated = :is_confirmated",
                TableName: this._table,
                Key: { 'id': id }
            }, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

}

module.exports = NotifyRepository;
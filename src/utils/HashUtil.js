const uuid = require("uuid");

module.exports = {

    uuid() {
        return uuid.v4();
    }
}
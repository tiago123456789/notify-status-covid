const nodemailer = require("nodemailer");

class Transport {

    create() {
        return nodemailer.createTransport(this.getOptions());
    }

    getOptions() {
        throw new Error("Method not implemented child class.");
    }
};

module.exports = Transport;
const Transport = require("./Transport");

class SmtpTransport extends Transport {

    getOptions() {
        return {
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_AUTH_USER,
                pass: process.env.EMAIL_AUTH_PASSWORD
            }
        };
    }
}

module.exports = SmtpTransport;
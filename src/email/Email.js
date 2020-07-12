const SmtpTransport = require("./StmpTransport");

class Email {

    constructor(transport = null) {
        this._from = "no-reploy <noreply@noreply.com.br>"
        this._to = null;
        this._name = null;
        this._subject = null;
        this._html = null;
        this._transport = transport || new SmtpTransport();
        this._cc = [];
    }

    withOneCC(email) {
        this._cc.push(email);
        return this;
    }

    withMultiplesCC(emails) {
        this._cc = this._cc.concat(emails);
        return this;
    }

    withTo(to) {
        this._to = to;
        return this;
    }

    withName(name) {
        this._name = name;
        return this;
    }

    withSubject(_subject) {
        this._subject = _subject;
        return this;
    }

    withHtml(html) {
        this._html = html;
        return this;
    }

    async send() {
        this._cc = this._cc.join(",");
        await this._transport.create().sendMail({
            from: this._from,
            to: this._to,
            subject: this._subject,
            html: this._html,
            cc: this._cc
        });
    }
}

module.exports = Email;
const axios = require("axios");

module.exports = {

    post(url, body, headers) {
        return axios.post(url, body, { headers })
    }
}
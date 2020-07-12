const HealhSecretaryRepository = require("./Repository/HealthSecretaryRepository");

new HealhSecretaryRepository()
    .getStatusCovid()
    .then(console.log)
    .catch(console.log)
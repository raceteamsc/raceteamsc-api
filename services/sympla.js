const axios = require('axios');
const sympla = axios.create({
    baseURL: "http://sympla.com.br/public/v3",
    headers: {
        S_TOKEN: process.env.SYMPLA_TOKEN
    }
});
module.exports = sympla;
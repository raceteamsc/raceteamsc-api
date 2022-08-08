const axios = require('axios');
const bot = axios.create({
    baseURL: "http://localhost:3000"
});
module.exports = bot;
const axios = require('axios');
const curlirize = require('axios-curlirize');

const whatsapp = axios.create({
    baseURL: `https://graph.facebook.com/v13.0/${process.env.SEND_NUMBER_ID}`,
    headers: {
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
    }
});
//curlirize(whatsapp);
module.exports = whatsapp;
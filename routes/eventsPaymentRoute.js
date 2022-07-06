const { Router } = require('express');
const PayController = require('../controllers/PayController');
const {checkHeader} = require('./checkHeader');
const router = Router();
router
  .post('/pay/create', checkHeader, PayController.createPay)
  .post('/pay/update', checkHeader, PayController.payUpdate)
  .get('/pay/check', checkHeader, PayController.checkPay)
  .get('/pay/:url', PayController.payPage)
module.exports = router;

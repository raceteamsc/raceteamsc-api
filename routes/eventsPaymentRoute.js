const { Router } = require('express');
const PayController = require('../controllers/PayController');

const router = Router();
router
  .post('/create', PayController.createPay)
  .post('/update', PayController.payUpdate)
  .get('/check', PayController.checkPay)
  .get('/:url', PayController.payPage)
module.exports = router;

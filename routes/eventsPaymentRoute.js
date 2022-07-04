const { Router } = require('express');
const PayController = require('../controllers/PayController');

const router = Router();
router
  .post('/create', PayController.createPay)
  .post('/update', PayController.payUpdate)
  .get('/:guid', PayController.payPage)
  .get('/checkPay', PayController.checkPay)
module.exports = router;

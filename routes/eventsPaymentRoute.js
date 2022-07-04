const { Router } = require('express');
const PayController = require('../controllers/PayController');

const router = Router();
router
  .post('/create', PayController.createPay)
  .post('/update', PayController.payUpdate)
  .get('/link/:guid', PayController.payPage)
  .get('/check', PayController.checkPay)
module.exports = router;

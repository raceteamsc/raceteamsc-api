const { Router } = require('express');
const PayController = require('../controllers/PayController');

const router = Router();
router
  .post('/create', PayController.createPay)
  .get('/update', PayController.payUpdate)
  .get('/:guid', PayController.payPage)
module.exports = router;

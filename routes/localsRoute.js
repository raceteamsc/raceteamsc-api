const { Router } = require('express');
const LocalsController = require('../controllers/LocalsController');

const router = Router();
router
  .get('/locals', LocalsController.getAllLocals)
  .get('/locals/:id', LocalsController.getLocal)
  .post('/locals',LocalsController.createLocal)
  .put('/locals/:id',LocalsController.updateLocal)
  .delete('/locals/:id', LocalsController.deleteLocal);
module.exports = router;

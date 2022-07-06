const { Router } = require('express');
const LocalsController = require('../controllers/LocalsController');
const {checkHeader} = require('./checkHeader');

const router = Router();
  router
    .get('/locals', checkHeader, LocalsController.getAllLocals)
    .get('/locals/:id', checkHeader, LocalsController.getLocal)
    .post('/locals', checkHeader, LocalsController.createLocal)
    .put('/locals/:id', checkHeader, LocalsController.updateLocal)
    .delete('/locals/:id', checkHeader, LocalsController.deleteLocal);
module.exports = router;

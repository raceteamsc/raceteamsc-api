const { Router } = require('express');
const LocalsController = require('../controllers/LocalsController');
const {checkHeader} = require('./checkHeader');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = Router();
  router
    .get('/locals', checkHeader, LocalsController.getAllLocals)
    .get('/locals/:id', checkHeader, LocalsController.getLocal)
    .post('/locals', upload.single('file'), checkHeader, LocalsController.createLocal)
    .put('/locals/:id', upload.single('file'), checkHeader, LocalsController.updateLocal)
    .delete('/locals/:id', checkHeader, LocalsController.deleteLocal);
module.exports = router;

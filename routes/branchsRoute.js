const { Router } = require('express');
const BranchsController = require('../controllers/BranchsController');
const {checkHeader} = require('./checkHeader');

const router = Router();
router
  .get('/branchs', checkHeader, BranchsController.getAllBranchs)
  .get('/branchs/:id', checkHeader, BranchsController.getBranch)
  .get('/branchs/main/events', checkHeader, BranchsController.getAllMainEvents)
  .get('/branchs/:branch/events', checkHeader, BranchsController.getAllEvents)
  .post('/branchs',checkHeader, BranchsController.createBranch)
  .put('/branchs',checkHeader, BranchsController.updateBranch)
  .delete('/events/:id', checkHeader, BranchsController.deleteBranch);
module.exports = router;

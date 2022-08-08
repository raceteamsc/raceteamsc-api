const { Router } = require('express');
const BranchsController = require('../controllers/BranchsController');
const {checkHeader} = require('./checkHeader');

const router = Router();
router
  .get('/branchs', checkHeader, BranchsController.getAllBranchs)
  .get('/branchs/:id', checkHeader, BranchsController.getBranch)
  .get('/branchs/main/events', checkHeader, BranchsController.getAllMainEvents)
  .get('/branchs/:branch/events', checkHeader, BranchsController.getAllEvents)
  .get('/branchs/:branch/locals', checkHeader, BranchsController.getAllLocals)
  .get('/branchs/:branch/members', checkHeader, BranchsController.getAllMembers)
  .post('/branchs',checkHeader, BranchsController.createBranch)
  .put('/branchs',checkHeader, BranchsController.updateBranch)
  .delete('/events/:id', checkHeader, BranchsController.deleteBranch);
module.exports = router;

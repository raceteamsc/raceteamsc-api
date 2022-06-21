const { Router } = require('express');
const MembersController = require('../controllers/MembersController');

const router = Router();
router
  .get('/members', MembersController.getAllMembers)
  .get('/members/:number', MembersController.getMember)
  .get('/members/:id/participants', MembersController.getEvents)
  .post('/members',MembersController.createMember)
  .put('/members/:id',MembersController.updateMember)
  .delete('/members/:id', MembersController.deleteMember);
module.exports = router;

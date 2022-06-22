const { Router } = require('express');
const MembersController = require('../controllers/MembersController');

const router = Router();
router
  .get('/members', MembersController.getAllMembers)
  .get('/members/:number', MembersController.getMember)
  .get('/search/members/:id', MembersController.getMemberById)
  .get('/members/:id/participants', MembersController.getEvents)
  .get('/members/:id/status/:eventId', MembersController.getStatus)
  .post('/members',MembersController.createMember)
  .put('/members/:id',MembersController.updateMember)
  .delete('/members/:id', MembersController.deleteMember);
module.exports = router;

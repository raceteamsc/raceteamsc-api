const { Router } = require('express');
const MembersController = require('../controllers/MembersController');
const {checkHeader} = require('./checkHeader');

const router = Router();
router
  .get('/members', checkHeader, MembersController.getAllMembers)
  .get('/members/:number', checkHeader, MembersController.getMember)
  .get('/search/members/:id', checkHeader, MembersController.getMemberById)
  .get('/members/:id/participants', checkHeader, MembersController.getEvents)
  .get('/members/:id/status/:eventId', checkHeader, MembersController.getStatus)
  .get('/members/:id/cars', checkHeader, MembersController.getMemberCars)
  .post('/members', checkHeader,MembersController.createMember)
  .put('/members/:id', checkHeader,MembersController.updateMember)
  .delete('/members/:id', checkHeader, MembersController.deleteMember)
  .post('/login',MembersController.login);
module.exports = router;

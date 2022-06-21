const { Router } = require('express');
const EventsController = require('../controllers/EventsController');

const router = Router();
router
  .get('/events', EventsController.getAllEvents)
  .get('/events/:id', EventsController.getEvent)
  .get('/events/:id/participants', EventsController.getParticipants)
  .post('/events/:id/participants', EventsController.confirmParticipant)
  .post('/events/:id/checkin', EventsController.checkinParticipant)
  .post('/events/:id/checkout', EventsController.checkoutParticipant)
  .post('/events/:id/recuse', EventsController.recuseParticipant)
  .post('/events',EventsController.createEvent)
  .put('/events/:id',EventsController.updateEvent)
  .delete('/events/:id', EventsController.deleteEvent);
module.exports = router;

const { Router } = require('express');
const EventsController = require('../controllers/EventsController');
const {checkHeader} = require('./checkHeader');

const router = Router();
router
  .get('/events', checkHeader, EventsController.getAllEvents)
  .get('/events/:id', checkHeader, EventsController.getEvent)
  .get('/search/events/:search', checkHeader, EventsController.searchEvent)
  .get('/events/:id/participants', checkHeader, EventsController.getParticipants)
  .post('/events/:id/participants', checkHeader, EventsController.confirmParticipant)
  .post('/events/:id/checkin', checkHeader, EventsController.checkinParticipant)
  .post('/events/:id/pay', checkHeader, EventsController.paidParticipant)
  .post('/events/:id/checkout', checkHeader, EventsController.checkoutParticipant)
  .post('/events/:id/recuse', checkHeader, EventsController.recuseParticipant)
  .post('/events',checkHeader, EventsController.createEvent)
  .put('/events/:id/cancel',checkHeader, EventsController.cancelEvent)
  .put('/events/:id/uncancel',checkHeader, EventsController.uncancelEvent)
  .delete('/events/:id', checkHeader, EventsController.deleteEvent);
module.exports = router;

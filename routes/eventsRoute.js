const { Router } = require('express');
const EventsController = require('../controllers/EventsController');
const {checkHeader} = require('./checkHeader');
const multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})

const upload = multer({ storage: storage })

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
  .post('/events',checkHeader, upload.single('file'), EventsController.createEvent)
  .put('/events/:id/cancel',checkHeader, EventsController.cancelEvent)
  .put('/events/:id',checkHeader, upload.single('file'), EventsController.updateEvent)
  .put('/events/:id/uncancel',checkHeader, EventsController.uncancelEvent)
  .delete('/events/:id', checkHeader, EventsController.deleteEvent);
module.exports = router;

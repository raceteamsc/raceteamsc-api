const bodyParser = require('body-parser');

const events = require('./eventsRoute');
const members = require('./membersRoute');
const locals = require('./localsRoute');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true, limit: 52428800 }));
  app.use(bodyParser.json({ limit: 52428800 }), events, members, locals);
};
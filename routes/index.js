const bodyParser = require('body-parser');

const events = require('./eventsRoute');
const branchs = require('./branchsRoute');
const members = require('./membersRoute');
const locals = require('./localsRoute');
const pay = require('./eventsPaymentRoute');

module.exports = (app) => {
  app.use("/", bodyParser.json({ limit: 52428800 }), events, branchs, members, locals, pay);
};
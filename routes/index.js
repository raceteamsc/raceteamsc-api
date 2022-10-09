const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const events = require('./eventsRoute');
const branchs = require('./branchsRoute');
const members = require('./membersRoute');
const locals = require('./localsRoute');
const pay = require('./eventsPaymentRoute');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({
          extended: false
  }));
  app.use(bodyParser.json());
  app.use("/api/", events, branchs, members, locals, pay);
};
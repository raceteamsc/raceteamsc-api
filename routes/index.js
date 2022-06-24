const bodyParser = require('body-parser');

const events = require('./eventsRoute');
const members = require('./membersRoute');
const locals = require('./localsRoute');

module.exports = (app) => {
  const checkHeader = (req, res, next) => {
    if (req.headers.auth == "b6f1eb97-84ad-4156-bde2-f1e14d8e7cdf")
      next();
    else
      res.status(401).json({message: "You do not have permission to access this route"})
  }
  app.use("/api", checkHeader, bodyParser.json({ limit: 52428800 }), events, members, locals);
};
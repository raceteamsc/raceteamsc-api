const key = "b6f1eb97-84ad-4156-bde2-f1e14d8e7cdf";
const checkHeader = (req, res, next) => {
  if (req.headers.auth == key)
    next();
  else
    res.status(401).json({message: "You do not have permission to access this route"})
}
module.exports = {checkHeader, key}
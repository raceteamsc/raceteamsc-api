const checkHeader = (req, res, next) => {
  if (req.headers.auth == process.env.VERIFY_TOKEN)
    next();
  else
    res.status(401).json({message: "You do not have permission to access this route"})
}
module.exports = {checkHeader}
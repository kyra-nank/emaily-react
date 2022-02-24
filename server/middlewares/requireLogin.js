module.exports = (req, res, next) => {

  // if passport did not find a user, end request - 401 is unauthorized / forbidden
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' })
  }

  next();

}
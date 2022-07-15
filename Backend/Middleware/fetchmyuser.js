var jwt = require('jsonwebtoken');
const JWT_Secret = "Thisissecret5435"
 
const fetchmyuser = (req, res, next) => {
  //get the user from the jwt token and id to request object

  const token = req.header("auth-token")
  if (!token) {
    res.status(401).send({ error: "Please Provide a valid token" })
  }

  try {
    const data = jwt.verify(token, JWT_Secret)
    req.user = data.user
    next()
  } catch (error) {
    res.status(401).send({ error: "Please Provide a valid token" })
  }


}

module.exports = fetchmyuser
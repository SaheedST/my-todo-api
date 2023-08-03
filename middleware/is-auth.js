const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const auth = req.get("Authorization");
//   console.log(auth);
  if (!auth) {
    return res.status(400).json({ message: "user authentication failed" });
  }

  //1. Extract token from auth string
  const token = auth.split(" ")[1];

  //2. Verify token is still valid - if not valid show error
  const decoded = jwt.verify(token, "catchmeifyoucan");
  if (!decoded) {
    return res.status(400).json({ message: "user authentication failed" });
  }

  //3. Get user Id and save in req.userId
  req.userId = decoded.id;
//   console.log(decoded);

  next();
};

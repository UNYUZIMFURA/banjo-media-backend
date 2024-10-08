const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader && authorizationHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({
      success: false,
      message: "Token not found!",
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        err,
        success: false,
        message: "Invalid token!",
      });
    }
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };

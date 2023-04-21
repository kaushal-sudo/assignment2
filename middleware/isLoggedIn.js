const Jwt = require("jsonwebtoken");
const jwtkey = "this_is_my_secret_key";

module.exports.isLoggedIn = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token && token.split(" ")[0] === "Bearer") token = token.split(" ")[1];
  if (token) {
    Jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        res.send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.send({ result: "Token is missing" });
  }
};

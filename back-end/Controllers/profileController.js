const jwt = require("jsonwebtoken");

exports.profile = function (request, response, next) {
  const token = request.cookies?.token;
  if (token) {
    jwt.verify(token, "seed", {}, (err, userData) => {
      if (err) throw err;
      response.json(userData);
    });
  } else {
    response.status(401).json("no token");
  }
};

// module.exports.checkAdmin = (request, response, next) => {
//   if (request.decodedToken.role === "admin") {
//     next();
//   } else {
//     throw new Error("Not authorized");
//   }
// };

// module.exports.checkUser = (request, response, next) => {
//   if (request.decodedToken.role === "user") {
//     next();
//   } else {
//     throw new Error("Not authorized");
//   }
// };

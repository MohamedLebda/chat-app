const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  try {
    const token = request.cookies.token;
    console.log(request.cookies);
    const decodedToken = jwt.verify(token, "seed");
    request.decodedToken = decodedToken;
    next();
  } catch (error) {
    throw new Error("Not authenticated");
  }
};

module.exports.checkAdmin = (request, response, next) => {
  if (request.decodedToken.role === "admin") {
    next();
  } else {
    throw new Error("Not authorized");
  }
};

module.exports.checkUser = (request, response, next) => {
  if (request.decodedToken.role === "user") {
    next();
  } else {
    throw new Error("Not authorized");
  }
};

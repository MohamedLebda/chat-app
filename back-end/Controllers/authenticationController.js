const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("./../Models/usersModel");
const UsersSchema = mongoose.model("users");

exports.login = function (request, response, next) {
  if (request.body.userName == "admin" && request.body.password == "123") {
    const token = jwt.sign(
      {
        id: 1,
        role: "admin",
        username: "admin",
      },
      "seed",
      { expiresIn: "1h" }
    );
    response.cookie("token", token, {
      maxAge: 3600000,
      sameSite: "none",
      secure: true,
    });
    response.status(200).json({ data: "ok", token });
  } else {
    UsersSchema.findOne({
      userName: request.body.userName,
      password: request.body.password,
    })
      .then((user) => {
        if (user == null) {
          throw new Error("Incorrect username or password");
        }
        const token = jwt.sign(
          {
            id: user._id,
            role: "user",
            userName: user.userName,
          },
          "seed"
        );
        response.cookie("token", token, {
          maxAge: 3600000,
          sameSite: "none",
          secure: true,
        });
        response.status(200).json({ data: "ok", token });
      })
      .catch((error) => next(error));
  }
};

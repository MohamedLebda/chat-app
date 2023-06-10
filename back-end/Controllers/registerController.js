const mongoose = require("mongoose");

require("./../Models/usersModel");
require("./../Models/counterModel");

const UsersSchema = mongoose.model("users");
const CounterSchema = mongoose.model("counter");

exports.register = function (request, response, next) {
  CounterSchema.findOneAndUpdate(
    { id: "autoVal" },
    { $inc: { seq: 1 } },
    { new: true }
  )
    .then((cd) => {
      if (cd == null) {
        const newVal = new CounterSchema({ id: "autoVal", seq: 1 });
        return newVal.save();
      } else {
        return Promise.resolve(cd);
      }
    })
    .then((cd) => {
      let obj = new UsersSchema({
        _id: cd.seq,
        userName: request.body.userName,
        password: request.body.password,
        email: request.body.email,
      });
      return obj.save();
    })
    .then((data) => {
      response.status(201).json(data);
    })
    .catch((error) => next(error));
};

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const wsServer = require("./ws");
const authenticationRouter = require("./Routes/authenticationRouter");
const registerRouter = require("./Routes/registerRouter");
const profileRouter = require("./Routes/profileRouter");
const authMW = require("./Middleware/authMW");

const server = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/chatApp")
  .then(() => {
    const appServer = server.listen(process.env.Port || 8080, () =>
      console.log("server is listening")
    );
    wsServer(appServer);
    console.log("DB connected");
  })
  .catch((error) => console.log(`DB error ${error}`));

//Logging Middleware
server.use(morgan("tiny"));
server.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Authorization Middleware
server.use(express.json());
server.use(cookieParser());
server.use(registerRouter);
server.use(authenticationRouter);

// routes
// server.use(authMW);
server.use(profileRouter);

// Not found Middleware
server.use((request, response) => {
  response.status(404).json({ message: "Page not Found" });
});

// Error Middleware
server.use((error, request, response, next) => {
  response.status(500).json({ message: " exception : " + error });
});

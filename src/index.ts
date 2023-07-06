// Initialize dotenv (process.env variables)
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import util from "util";
// API routes

import { importRoutes } from "./utils/routeUtils";

// import apiRoutes from "./routes/apiRoutes";

// Routes

import infoRoute from "./routes/info";
import swapRoute from "./routes/swap";
import walletRoute from "./routes/wallet";
import testRoute from "./routes/testRoute";
import authRoutes from "./routes/auth";
import chatRoutes from "./routes/chat";

// Routes end

import morgan from "morgan";
import { getWallet } from "./components/handlers";

// Utils
import logRoutes from "./utils/logRoutes";

//

const routes = importRoutes("./routes");
const router = express.Router();

const app = express();

// for (const routeName in routes) {
//   app.use("/", routes[routeName]);
// }

// Version
// app.use(versionMiddleware);

// Allow us to use req.body

app.use(express.json());

// chat imports

import { Server } from "socket.io";

// app.use("/", apiRoutes);

// Give us pretty logs <3

// app.use(
//   morgan("common", {
//     stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
//       flags: "a",
//     }),
//   })
// );

// app.use(morgan("combined")); // or: combined
//

// <----- Auth Routes ----->

// import authRoutes from "./routes/authRoutes"

// Login

// app.use("/auth", authRoutes);

/// Finish Auth Routes

//Initially connect to MongoDB
// if (typeof process.env.DB_CONNECTION !== "string")
//   throw new Error("process.env.MONGO_DB_ROUTE is not a string");
// mongoose.connect(process.env.DB_CONNECTION).then(() => {
//   // The then is unnecessary, but it's here for clarity
//   console.log("Successfully connected to MongoDB");
// });

//

// <----- Routes ----->
// app.use("/", walletRoute);
// app.use("/", infoRoute);
// app.use("/", swapRoute);
// app.use("/", testRoute);
// app.use("/chat", chatRoutes);

// app._router.stack?.map((route: any) => {
//   console.log(route.path);
// });

// chat
const io = new Server(4000);

let counter = 0;

io.on("connection", (socket) => {
  // send a message to the client
  console.log("User connected " + counter + " userid ");
  console.log(util.inspect(socket.id));
  console.log("---");
  console.log("---");
  console.log("---");
  console.log("---");
  console.log("---");
  console.log("---");
  console.log("---");
  console.log("---");
  console.log("---");
  console.log(JSON.stringify(socket.data));
  counter++;
  socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

  socket.on("chatMessage", (message) => {
    if (message === "hello") {
      socket.broadcast.emit(
        "delivered",
        "Somebody said hello! :) hello everyone"
      );
    }

    console.log("Received message : ");
    console.log(message);
    socket.emit("delivered", `Message was sent, ${message}`);
  });

  // receive a message from the client
  // socket.on("hello from client", (...args) => {
  //   // ...
  // });
  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

app.listen(3000, () => console.log("Listening on port 3000 => "));

logRoutes(app);

// /// If you ever can't figure out why routes don't work... this can help :)
// import expressListRoutes from "express-list-routes";

//

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import infoRoute from "./routes/info.js";
import swapRoute from "./routes/swap.js";
import morgan from "morgan";
import { getWallet } from "./routes/helpers.js";

const app = express();

app.use(morgan("tiny")); // or: combined

app.use(express.json()); // Allow us to use req.body

//Initially connect to MongoDB
if (typeof process.env.DB_CONNECTION !== "string")
  throw new Error("DB_CONNECTION is not a string");
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    // The then is unnecessary, but it's here for clarity
    console.log("Successfully connected to MongoDB");
  });

// app.use("/", infoRoute);
// app.use("/", swapRoute);

// const wallets = [
//   {
//     username: "Kyle",
//     title: "Post 1",
//   },
//   {
//     username: "Jim",
//     title: "Post 2",
//   },
// ];

// app.get("/posts", authenticateToken, (req, res) => {
//   // res.json(posts.filter((post) => post.username === req.user.name));
//   const wallet = getWallet(req.user.name);
//   res.json(wallet);
// });

function authenticateToken(req : any, res : any, next : any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err : any, user : any) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000, () => console.log("Listening on port 3000 =>"));

// /// If you ever can't figure out why routes don't work... this can help :)
// import expressListRoutes from "express-list-routes";
// expressListRoutes(app);
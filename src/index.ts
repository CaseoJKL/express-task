// Initialize dotenv (process.env variables)
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import infoRoute from "./routes/info";
import swapRoute from "./routes/swap";
import walletRoute from "./routes/wallet";
import morgan from "morgan";
import { getWallet } from "./components/handlers";

const app = express();
// Allow us to use req.body
app.use(express.json());

// Give us pretty logs <3
app.use(morgan("tiny")); // or: combined
//

// <----- Auth Routes ----->
// let refreshTokens: string[] = [];

// Login
app.post("/login", (req, res) => {
  // Authenticate User

  const keyPhrase = req.body.keyPhrase;
  const user = { keyPhrase: keyPhrase };
  console.log(user);
  console.log("- - - - - - - - - - /login end - - - - - - - - - -");
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  // refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user: {}) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "50m",
  });
}

function generateRefreshToken(user: {}) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string);
}
// POST
// Get refreshToken

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.sendStatus(401);
  // if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({ keyPhrase: user.keyPhrase });
      console.log("Decoded refreshToken = " + JSON.stringify(user.keyPhrase));

      console.log(accessToken);
      console.log("- - - - - - - - - - /token end - - - - - - - - - -");
      return res.json({ accessToken: accessToken });
    }
  );
  // return res.sendStatus(403);
});

// Logout
app.delete("/logout", (req, res) => {
  // Remove invalid refresh tokens
  // refreshTokens = refreshTokens.filter((token) => token !== req.body.token);

  res.sendStatus(204);
});

/// Finish Auth Routes

//Initially connect to MongoDB
if (typeof process.env.DB_CONNECTION !== "string")
  throw new Error("process.env.MONGO_DB_ROUTE is not a string");
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  // The then is unnecessary, but it's here for clarity
  console.log("Successfully connected to MongoDB");
});

//

// <----- Routes ----->
app.use("/", walletRoute);
app.use("/", infoRoute);
app.use("/", swapRoute);

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

app.listen(3000, () => console.log("Listening on port 3000 => "));

// /// If you ever can't figure out why routes don't work... this can help :)
// import expressListRoutes from "express-list-routes";
// expressListRoutes(app);

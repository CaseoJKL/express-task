import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

const router = express.Router();
const app = express();

router.post("/login", (req: Request, res: Response) => {
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

router.post("/token", (req, res) => {
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
router.delete("/logout", (req: Request, res: Response) => {
  // Remove invalid refresh tokens
  // refreshTokens = refreshTokens.filter((token) => token !== req.body.token);

  res.sendStatus(204);
});

export default router;

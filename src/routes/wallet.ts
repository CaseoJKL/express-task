import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import axios from "axios";
import Wallet from "../models/wallet";
import { getWallet, createWallet, deleteWallet } from "../components/handlers";
import wallet from "../models/wallet";

const router = express.Router();
const app = express();

// GET
// Access Wallet
router.get("/wallet", authenticateToken, async (req: any, res: any) => {
  console.log(req.keyPhrase);
  const wallet = await getWallet(req.keyPhrase);

  if (!wallet) return res.sendStatus(403);

  res.json(wallet);
});

// Auth middleware for GET /wallet
function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) return res.sendStatus(401);

  req.token = token;
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, decoded: any) => {
      console.log("Error: " + err);
      if (err) return res.sendStatus(403);
      //@ts-ignore
      req.keyPhrase = decoded.keyPhrase;
      console.log(decoded);
      console.log(decoded.keyPhrase);
      next();
    }
  );
}

// Create a new wallet
router.post("/wallet/create", async (req, res) => {
  // if (typeof req.body.keyPhrase !== "string")
  //   return res.status(400).send('Body parameter "keyPhrase" is required.');
  // const keyPhrase = req.body.keyPhrase;
  let wallet = await createWallet();

  console.log("wallet: ", wallet);
  console.log("- - - - - - - - - -");
  return res.json({
    keyPhrase: wallet.keyPhrase,
    balance: wallet.balance,
  });
});

// Delete an existing wallet
router.delete("/wallet/delete", async (req, res) => {
  if (typeof req.body.keyPhrase !== "string")
    return res.status(400).send('Body parameter "keyPhrase" is required.');
  const keyPhrase = req.body.keyPhrase;
  let wallet = await deleteWallet(keyPhrase);

  console.log("wallet: ", wallet); // We don't return a wallet from deleteWallet, so this log should always be undefined
  return res.json({
    // @ts-ignore: Help
    keyPhrase: wallet.keyPhrase,
    // @ts-ignore: Help
    balance: wallet.balance,
  });
});

// Update an existing wallet
router.patch("/wallet", async (req, res) => {
  if (typeof req.body.keyPhrase !== "string")
    return res.status(400).send('Body parameter "keyPhrase" is required.');
  const keyPhrase = req.body.keyPhrase;
  const newKeyPhrase = req.body.newKeyPhrase;

  let wallet = await getWallet(keyPhrase);
  if (!wallet) return res.status(400).send("Wallet address does not exist.");
  wallet.keyPhrase = newKeyPhrase;
  await wallet.save();

  console.log("wallet: ", wallet);
  return res.json({
    keyPhrase: wallet.keyPhrase,
    balance: wallet.balance,
  });
});

export default router;

import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import Wallet from "../models/wallet";
import { getWallet, createWallet, deleteWallet } from "./helpers";

const router = express.Router();
const app = express();

// <--- ROUTES --->

// GET
// Because this is a GET, I think using query params is fine
router.get("/info/prices/:symbolName", async (req, res) => {
  if (typeof req.params.symbolName !== "string")
    return res.status(400).json('Query parameter "name" is required.');
  const symbolName = req.params.symbolName.toUpperCase();
  const result = await axios({
    method: "post",
    url: `https://min-api.cryptocompare.com/data/price?fsym=${symbolName}&tsyms=USD&api_key=${process.env.CRYPTOCOMPARE_API_KEY}`,
  });

  console.log("result: ", result.data);
  res.json(result.data);
});

router.get("/wallet/:walletAddress", async (req, res) => {
  if (typeof req.params.walletAddress !== "string")
    return res.status(400).send('Body parameter "walletAddress" is required.');
  const walletAddress = req.params.walletAddress;

  const wallet = await Wallet.findOne({
    walletAddress: walletAddress,
  });
  if (wallet) return res.status(400).send("Wallet address already exists.");
  await createWallet(walletAddress);

  return res.json({
    // @ts-ignore: Object is possibly 'null'.
    walletAddress: wallet.walletAddress,
    // @ts-ignore: Object is possibly 'null'.
    balance: wallet.balance,
  });
});

// POST
router.post("/info/prices", async (req, res) => {
  if (typeof req.body.symbolName !== "string")
    return res.status(400).json('Body parameter "name" is required.');
  const symbolName = req.body.symbolName.toUpperCase();
  const result = await axios({
    method: "post",
    url: `https://min-api.cryptocompare.com/data/price?fsym=${symbolName}&tsyms=USD&api_key=${process.env.CRYPTOCOMPARE_API_KEY};`,
  });

  console.log("result: ", result.data);
  res.json(result.data);
});

router.post("/wallet/create", async (req, res) => {
  if (typeof req.body.walletAddress !== "string")
    return res.status(400).send('Body parameter "walletAddress" is required.');
  const walletAddress = req.body.walletAddress;
  let wallet = await createWallet(walletAddress);

  console.log("wallet: ", wallet);
  return res.json({
    walletAddress: wallet.walletAddress,
    balance: wallet.balance,
  });
});

// DELETE
router.delete("/wallet/delete", async (req, res) => {
  if (typeof req.body.walletAddress !== "string")
    return res.status(400).send('Body parameter "walletAddress" is required.');
  const walletAddress = req.body.walletAddress;
  let wallet = await deleteWallet(walletAddress);

  console.log("wallet: ", wallet); // We don't return a wallet from deleteWallet, so this log should always be undefined
  return res.json({
    // @ts-ignore: Help
    walletAddress: wallet.walletAddress,
    // @ts-ignore: Help
    balance: wallet.balance,
  });
});

router.patch("/wallet", async (req, res) => {
  if (typeof req.body.walletAddress !== "string")
    return res.status(400).send('Body parameter "walletAddress" is required.');
  const walletAddress = req.body.walletAddress;
  const newWalletAddress = req.body.newWalletAddress;

  let wallet = await getWallet(walletAddress);
  if (!wallet) return res.status(400).send("Wallet address does not exist.");
  wallet.walletAddress = newWalletAddress;
  await wallet.save();

  console.log("wallet: ", wallet);
  return res.json({
    walletAddress: wallet.walletAddress,
    balance: wallet.balance,
  });
});

export default router;

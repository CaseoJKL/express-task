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

// router.get("/wallet/:keyPhrase", async (req, res) => {
//   if (typeof req.params.keyPhrase !== "string")
//     return res.status(400).send('Body parameter "keyPhrase" is required.');
//   const keyPhrase = req.params.keyPhrase;

//   const wallet = await Wallet.findOne({
//     keyPhrase: keyPhrase,
//   });
//   if (wallet) return res.status(400).send("Wallet address already exists.");
//   await createWallet();

//   return res.json({
//     // @ts-ignore: Object is possibly 'null'.
//     keyPhrase: wallet.keyPhrase,
//     // @ts-ignore: Object is possibly 'null'.
//     balance: wallet.balance,
//   });
// });

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

// DELETE
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

router.patch("/wallet", async (req, res) => {
  if (typeof req.body.keyPhrase !== "string")
    return res.status(400).send('Body parameter "keyPhrase" is required.');
  const keyPhrase = req.body.keyPhrase;
  const newkeyPhrase = req.body.newkeyPhrase;

  let wallet = await getWallet(keyPhrase);
  if (!wallet) return res.status(400).send("Wallet address does not exist.");
  wallet.keyPhrase = newkeyPhrase;
  await wallet.save();

  console.log("wallet: ", wallet);
  return res.json({
    keyPhrase: wallet.keyPhrase,
    balance: wallet.balance,
  });
});

export default router;

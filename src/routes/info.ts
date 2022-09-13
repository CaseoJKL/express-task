import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import Wallet from "../models/wallet";
import { getWallet, createWallet, deleteWallet } from "../components/handlers";

const router = express.Router();
const app = express();

// <--- ROUTES --->

// GET
// Because this is a GET, I think using query params is fine
// Get the price of a cryptocurrency
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

// POST
// Get the price of a cryptocurrency
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

export default router;

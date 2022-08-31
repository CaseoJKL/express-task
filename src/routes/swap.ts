import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import Wallet from "../models/wallet.js";
import { getWallet, createWallet, deleteWallet } from './helpers.js';

const router = express.Router();
const app = express();

router.patch("/swap", async (req, res) => {
    const numberRegex = /^[0-9]+$/;
  
    if (
      typeof req.body.from !== "string" ||
      typeof req.body.to !== "string" ||
      typeof req.body.walletAddress !== "string"
    )
      return res.status(400).json("Invalid body parameters");
  
    if (!numberRegex.test(req.body.amount))
      return res.status(404).json("Amount parameter must be a number");
  
    const fromSymbolName = req.body.from.toUpperCase();
    const toSymbolName = req.body.to.toUpperCase();
    const walletAddress = req.body.walletAddress;
    const result = await axios({
      method: "post",
      url: `https://min-api.cryptocompare.com/data/price?fsym=${toSymbolName}&tsyms=${fromSymbolName}&api_key=${process.env.CRYPTOCOMPARE_API_KEY}`
    });
  
    const wallet = await getWallet(walletAddress);
    if (!wallet) return res.status(404).json("Wallet address does not exist");
    console.log('wallet: ', wallet);
    // Update wallet balances here
    // wallet.something = somethingElse; 
  
    // save the wallet
    await wallet.save(); // This will update the Wallet in Mongo
    return res.json();
    // try {
    //   const { modifiedCount } = await Wallet.updateOne(
    //     { walletAddress: walletAddress }
    //     // { balance[0].USDT?? : ?? } // This part is where I'm getting confused how to write the logic to access and change both USDT and ETH values.I know I probably would need to use Model.updateMany() instead of Model.updateOne()
    //   );
    //   console.log("Wallet address updated successfully.");
    //   if (modifiedCount === 2) return wallet;
    // } catch (err) {
    //   console.log("Could not update the wallet.");
    // }
  
    // wallet.balance.console.log("result: ", result.data);
    // res.json(result.data);
  });
  
  export default router;
  
import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import Wallet from "../models/wallet.js";

export async function getWallet(walletAddress : string) {
    if (!walletAddress)
        throw new Error("getWallet called without a walletAddress.");

    let wallet = await Wallet.findOne({
        walletAddress: walletAddress,
    });
    return wallet;
}

// Create One
export async function createWallet(walletAddress : string) {
    // Because we are explicitly calling "CREATE wallet", we probably don't actually want to continue if there is a wallet -- we may want to error instead.
    // let wallet = await getWallet(walletAddress);

    let walletExists = await Wallet.findOne({ walletAddress: walletAddress });
    if (walletExists) throw new Error("Wallet already exists.");

    const wallet = await Wallet.create({
        walletAddress: walletAddress,
        balance: [{ USDT: 1000000 }, { ETH: 0 }],
        // If we were using more coins than just USDT and ETH, we'd need to add more keys to this object -- same for models/wallet.js.
        // Instead, we should only set the user's USDT balance, and then check: If the wallet's "balance.ETH" value is "undefined", set it to 0.
        // But, for this simple app, it will be fine :)
    });
    console.log("Wallet created for address: ", wallet.walletAddress);
    console.log(wallet.balance[0].USDT);
    return wallet;
}

// Delete One
// Because we should only ever need to delete a wallet from one route, we probably don't need a separate function for this -- but that's personal taste.
export async function deleteWallet(walletAddress : string) {
    let wallet = await getWallet(walletAddress);

    if (!wallet) throw new Error("Wallet does not exist."); // Should probably do something here? Maybe return "false" if there isn't a wallet? 
    // Or, even better: Just pass us in a Wallet object, and delete it.
    await wallet.delete();
}; 
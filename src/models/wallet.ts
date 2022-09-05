import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
  balance: {
    type: {
      USDT: { type: Number, default: 0 },
      ETH: { type: Number, default: 0 },
    },
    default: {},
  },
  walletAddress: String,
});

export default mongoose.model("Wallet", WalletSchema);

// const model = mongoose.model("Wallet", WalletSchema);

// (async () => {
//   // drop the model collection
//   await model.collection.drop();

//   const wallets = await model.find();
//   console.log("wallets: ", wallets);

//   await model.create({
//     balance: { USDT: 100 },
//     walletAddress: "0x123",
//   });

//   const wallet = await model.findOne();
//   console.log(wallet);
//   wallet;
// })();

// console.log("aaa");

// export default model;

import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
  balance: {
    type: {
      USDT: {
        amount: { type: Number, default: 1000 },
        depositAddress: String,
      },
      ETH: {
        amount: { type: Number, default: 0 },
        depositAddress: String,
      },
    },
    default: {},
  },
  keyPhrase: String,
});

// const WalletSchema = new mongoose.Schema({
//   balance: {
//     type: {
//       USDT: { type: Number, default: { value: 0 } },
//       ETH: { type: Number, default: 0 },
//     },
//     default: {},
//   },
//   keyPhrase: String,
// });

export default mongoose.model("Wallet", WalletSchema);

// const model = mongoose.model("Wallet", WalletSchema);

// (async () => {
//   // drop the model collection
//   await model.collection.drop();

//   const wallets = await model.find();
//   console.log("wallets: ", wallets);

//   await model.create({
//     balance: { USDT: 100 },
//     keyPhrase: "0x123",
//   });

//   const wallet = await model.findOne();
//   console.log(wallet);
//   wallet;
// })();

// console.log("aaa");

// export default model;

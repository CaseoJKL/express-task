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

export default mongoose.model("Wallet", WalletSchema);

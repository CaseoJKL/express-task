import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
  balance: [{ USDT: Number }, { ETH: Number }],
  walletAddress: String,
});

export default mongoose.model("Wallet", WalletSchema);
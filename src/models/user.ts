import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
  user: {
    // type: {
    username: String,
    firstname: String,
    lastname: String,
    password: String,

    // },
    // default: {},
  },
  keyPhrase: String,
});

export default mongoose.model("Wallet", WalletSchema);

// user = {
//     name: 'lawlzer',
//     postIDs: [0001, 0002, 0003], // option 1
//   }

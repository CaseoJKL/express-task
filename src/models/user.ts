import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user: {
    // type: {
    username: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },

    // },
    // default: {},
  },
  keyPhrase: String,
});

export default mongoose.model("User", UserSchema);

// user = {
//     name: 'lawlzer',
//     postIDs: [0001, 0002, 0003], // option 1
//   }

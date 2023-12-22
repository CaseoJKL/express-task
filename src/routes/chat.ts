import express from "express";
import { Server } from "socket.io";

// const io = new Server(4000);
const router = express.Router();
const app = express();

// io.on("connection", (socket) => {
//   // send a message to the client
//   socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

//   // receive a message from the client
//   socket.on("hello from client", (...args) => {
//     // ...
//   });
// });

router.get("/", async (req, res) => {
  //   if (typeof req.params.symbolName !== "string")
  //     return res.status(400).json('');

  res.json({ result: true, chat: true });
});
export default router;

import express from "express"
import http from "http"
import { Server } from "socket.io"
import * as dotenv from "dotenv"

dotenv.config({path: "../.env"});


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT"]
    }
});

io.on("connection", socket => {
  console.log("new user!")

  io.on("disconnect", socket => {
    console.log("user disconnected.");
  })

})

const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log(`running server on port ${port}...`);
})
import express from "express"
import http from "http"
import { Server } from "socket.io"
import * as dotenv from "dotenv"
import Room from "./models/Room.js";
import mongoose from "mongoose";

dotenv.config({path: "../.env"});

mongoose.connect("mongodb://127.0.0.1:27017/chatApp", {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5174", "http://localhost:5173"],
      methods: ["GET", "POST", "DELETE", "PUT"]
    }
});

/*

  When the user enters the website we want to present him with 2 options:
    a: join room
    b: create room

  join room will look inside of our rooms collection and if it finds a room, it will add our user (username) to the participants collection
  create room will first look if there are any pre-existing rooms and if not will create a new room document inside of rooms

  after our room is created, in our react app we will navigate to /rooms/roomName and request data from our web socket
  that is we will look for participants and messages. If the user is not in the participants collection, we will kick him out.

*/

io.on("connection", socket => {

  socket.on("join_room", (data, response) => {
    console.log(data);
  });

  socket.on("create_room", async (data, response) => {
    console.log(data);
    
    try {
      const room = new Room({
        name: data.room,
        messages: [],
        participants: [{username: data.username}]
      });

      await room.save();
      response({status: "OK"});
    }
    catch (error) {
      console.error(error.messa);
      response({status: "ERROR", error: String(error)});
    }
  });


  socket.on("disconnection", socket => {
    console.log("user disconnected.");
  });

})

const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log(`running server on port ${port}...`);
})
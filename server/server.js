import express, { response } from "express";
import http from "http";
import { Server } from "socket.io";
import * as dotenv from "dotenv";
import Room from "./models/Room.js";
import mongoose from "mongoose";

dotenv.config({ path: "../.env" });

mongoose.connect("mongodb://127.0.0.1:27017/chatApp", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5174", "http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

/*

  When the user enters the website we want to present them with 2 options:
    a: join room
    b: create room

  join room will look inside of our rooms collection and if it finds a room, it will add our user (username) to the participants collection
  create room will first look if there are any pre-existing rooms and if not will create a new room document inside of rooms

  after our room is created, in our react app we will navigate to /rooms/roomName and request data from our web socket
  that is we will look for participants and messages. If the user is not in the participants collection, we will kick him out.

*/

io.on("connection", (socket) => {

  socket.on("send_message", async (data, response) => {
    console.log("receiving message ", data);
    try {
      const room = await Room.findOne({ name: data.room });

      if (room) {
        const newMessage = room.messages.create({
          text: data.message,
          sender: { username: data.user },
        });

        room.messages.push(newMessage);
        await room.save();

        io.emit("new_message", newMessage);
        response({status: "OK", message: "successfully created new message"});
      }

    } catch (error) {
      response({ status: "ERROR", error });
      console.error(error);
    }
  });

  socket.on("get_room", async (data, response) => {
    try {
      const room = await Room.findOne({ name: data.room });

      if (room)
        response({
          status: "OK",
          room: room,
          message: "successfuly found room",
        });
      else response({ status: "NOT FOUND", message: "no room found" });
    } catch (error) {
      response({ status: "ERROR", error: error });
    }
  });

  socket.on("join_room", async (data, response) => {
    try {
      const room = await Room.findOne({ name: data.room });

      if (!room) response({ status: "ERROR", error: "no room found" });
      if (room.participants.includes({ username: data.username }))
        response({ status: "OK" });

      room.participants.push({ username: data.username });
      room.save();

      response({ status: "OK" });
    } catch (error) {
      response({ status: "ERROR", error: String(error) });
    }
  });

  socket.on("create_room", async (data, response) => {
    try {
      const room = new Room({
        name: data.room,
        messages: [],
        participants: [{ username: data.username }],
      });

      const roomQuery = await Room.findOne({ name: data.name });
      if (roomQuery) throw new Error("Room already exists!");
      else await room.save();

      response({ status: "OK" });
    } catch (error) {
      response({ status: "ERROR", error: String(error) });
    }
  });

  socket.on("validate_connection", async (data, response) => {
    try {
      const room = await Room.findOne({ name: data.room });

      if (!room) response({ status: "ERROR", error: "no room found" });
      room.participants.forEach((participant) => {
        if (participant.username === data.user) response({ status: "OK" });
      });

      response({ status: "ERROR", error: "access denied" });
    } catch (error) {
      response({ status: "ERROR", error: String(error) });
    }
  });

  socket.on("disconnection", (socket) => {
    console.log("user disconnected.");
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`running server on port ${port}...`);
});

import { model, Schema } from "mongoose"


const participantSchema = new Schema({
  username: {
    type: String,
    require: true
  }
});

const messageSchema = new Schema({
  text: {
    type: String,
    require: true
  },
  sender: participantSchema
});

const roomSchema = new Schema({
  name: {
    type: String
  },
  participants: [participantSchema],
  messages: [messageSchema]
});

const Room = model("Room", roomSchema);

export default Room;
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
}, {timestamps: true});

const roomSchema = new Schema({
  name: {
    type: String
  },
  participants: [participantSchema],
  messages: [messageSchema]
});


roomSchema.pre("validate", async function(next) {
  // making sure no 2 rooms can have the same name
  if (this.name === "") throw new Error("Room name can't be an empty string!")
  if (this.participants[0].username === "") throw new Error("Username can't be an empty string!")

  next();
});

const Room = model("Room", roomSchema);
export default Room;
import { useContext, useState } from "react"
import { SocketContext } from "../App";

const JoinRoom = () => {
  const socket = useContext(SocketContext);
  
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const handleJoin = () => {
    socket.emit("join_room", {username, room}, (response) => {
      console.log(response.status);
    });
  }

  const handleCreate = () => {
    socket.emit("create_room", {username, room}, (response) => {
      console.log(response.status, response.error);
    });
  }

  return (
    <div className="room-container">
      <section className="first-panel">
        <div className="ribbon">Valal-Chat</div>
        <div className="input">
          <div className="input-form">
            <label>Username</label>
            <input onChange={event => setUsername(event.target.value)} type="text" placeholder="John" />
          </div>
          
          <div className="input-form">
            <label>Room</label>
            <input onChange={event => setRoom(event.target.value)} type="text" placeholder="robotics-101" />
          </div>
          
          <div className="buttons">
            <button className="join" onClick={handleJoin}>Join Room</button>
            <button className="create" onClick={handleCreate}>Create Room</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default JoinRoom
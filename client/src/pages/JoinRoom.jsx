import { useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { GlobalContext, useUser} from "../App";

const JoinRoom = () => {
  const socket = useContext(GlobalContext);
  const [user, dispatch] = useUser();

  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");

  const handleJoin = () => {
    dispatch({type: "set", payload: username});

    socket.emit("join_room", {username, room}, (response) => {
      console.log(response.status, response.error);
      
      if (response.error) setError(response.error);
      else navigate(`/client/rooms/${room}`);

    });
  }

  const handleCreate = () => {
    dispatch({type: "set", payload: username});
    
    socket.emit("create_room", {username, room}, (response) => {
      console.log(response.status, response.error);

      if (response.error) setError(response.error)
      else setError("");
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
            <p className="error">{error}</p>
          </div>
          
          <div className="buttons">
            <button tabIndex={[0]} className="join" onClick={handleJoin}>Join Room</button>
            <button tabIndex={[0]} className="create" onClick={handleCreate}>Create Room</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default JoinRoom
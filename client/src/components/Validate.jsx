import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../App";

const Validate = ({ children }) => {
  const { user, socket } = useContext(GlobalContext);
  const { room } = useParams();
  const [status, setStatus] = useState("");

  useEffect(() => {
    socket.emit("validate_connection", { room, user }, (response) =>
      setStatus(response.status)
    );
  }, []);

  if (status === "OK") return children;

  return (
    <div className="room-container">
      <h1 className="error">You do not have access to this room</h1>
    </div>
  );
};

export default Validate;

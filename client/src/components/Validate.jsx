import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext, useUser } from "../App";

const Validate = ({ children }) => {
  const socket = useContext(GlobalContext);
  const [ user, dispatch ] = useUser();
  const { id: room } = useParams();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (user && room) {
      socket.emit("validate_connection", { room: room, user }, (response) => {
        setStatus(response.status);
      });
    }
  }, [user, room]);

  if (status === "OK") return children;
  else if (status === "ERROR") {
    return (
      <div className="error-container">
        <div className="error-text">
          <svg fill="#670404" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" stroke="#670404"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M507.494,426.066L282.864,53.537c-5.677-9.415-15.87-15.172-26.865-15.172c-10.995,0-21.188,5.756-26.865,15.172 L4.506,426.066c-5.842,9.689-6.015,21.774-0.451,31.625c5.564,9.852,16.001,15.944,27.315,15.944h449.259 c11.314,0,21.751-6.093,27.315-15.944C513.508,447.839,513.336,435.755,507.494,426.066z M256.167,167.227 c12.901,0,23.817,7.278,23.817,20.178c0,39.363-4.631,95.929-4.631,135.292c0,10.255-11.247,14.554-19.186,14.554 c-10.584,0-19.516-4.3-19.516-14.554c0-39.363-4.63-95.929-4.63-135.292C232.021,174.505,242.605,167.227,256.167,167.227z M256.498,411.018c-14.554,0-25.471-11.908-25.471-25.47c0-13.893,10.916-25.47,25.471-25.47c13.562,0,25.14,11.577,25.14,25.47 C281.638,399.11,270.06,411.018,256.498,411.018z"></path> </g> </g> </g></svg>
          <h1 className="error">You do not have access to this room</h1>
        </div>

        <Link to="/"><button>Go Back</button></Link>
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div></div>
    </div>
  )

};

export default Validate;

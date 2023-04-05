import { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom";
import { GlobalContext, useUser } from "../App";
import ChatBlock from "../components/ChatBlock"
import ChatSessionBlock from "../components/ChatSessionBlock"

const Chat = () => {
  const [room, setRoom] = useState({});
  const [messages, setMessages] = useState([]);
  
  const [newMessage, setNewMessage] = useState("");
  
  const { id: roomName } = useParams(); 
  const [user, dispatch] = useUser(); 
  const socket = useContext(GlobalContext)

  useEffect(() => {
    socket.emit("get_room", {room: roomName}, (response) => {
      console.log(response)

      if (response.status === "OK") {
        setRoom(response.room);
        setMessages(response.messages);
      }
    });  
  }, []);

  useEffect(() => {
    socket.on("new_message", (message) => {
      setMessages([...messages, message]);
      console.log("new message: ",  message)
      console.log([...messages, message], "type: ", typeof(messages));
    });
  });

  const sendMessage = () => {
    console.log("sending...")

    setNewMessage("");
    socket.emit("send_message", ({user, message: newMessage, room: roomName}), (response) => {
      console.log(response);
    });
  }

  const handleKeyDown = event => {
    if (event.key === "Enter") sendMessage();
  }
  
  
  return (
    <div className="chat-container">
      <div className="side-panel">
        <ChatSessionBlock name="test group" participants="tommy and bobby" />
      </div>
      <div className="chat">
        <div className="chat-blocks">
          {messages?.map((message, index) => <ChatBlock message={message.text} author={message.sender} key={index}/>)}
        </div>

        <input onKeyDown={handleKeyDown} value={newMessage} type="text" placeholder="Enter text here..." onChange={event => setNewMessage(event.target.value)}/>
      </div>
    </div>
  )
}

export default Chat
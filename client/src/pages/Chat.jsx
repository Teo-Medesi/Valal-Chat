import React from "react"
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
        setMessages(response.room.messages);
      }
    });  
  }, []);

  useEffect(() => {
    if (!socket.hasListeners("new_message")) {
      socket.on("new_message", (message) => {
        setMessages(current => [...current, message])
      });
    }

    return () => {
      socket.off("new_message", (message) => {
        setMessages(current => [...current, message])
      });
    }

  }), [];

  const sendMessage = () => {
    setNewMessage("");
    socket.emit("send_message", ({user, message: newMessage, room: roomName}), (response) => {
      console.log(response);
    });
  }

  const handleKeyDown = event => {
    if (event.key === "Enter" && newMessage.length !== 0) sendMessage();
  }
  
  useEffect(() => {
    console.log(messages);
  }, [messages])
  


  return (
    <div className="chat-container">
      <div className="side-panel">
        <ChatSessionBlock name={room.name} participants={room.participants?.map(participant => participant.username + " ")} />
      </div>
      <div className="chat">
        <div className="chat-blocks">
          {messages?.map(message => <ChatBlock message={message.text} sender={message.sender.username} />)}
        </div>

        <input autoFocus onKeyDown={handleKeyDown} value={newMessage} type="text" placeholder="Enter text here..." onChange={event => setNewMessage(event.target.value)}/>
      </div>
    </div>
  )
}

export default Chat
import { useEffect, useState } from "react";
import { useUser } from "../App"

const ChatBlock = ({message, sender}) => {
  const [user, dispatch] = useUser();
  const [isMessageByUser, setIsMessageByUser] = useState(false);

  useEffect(() => {
    if (sender === user) setIsMessageByUser(true);
  }, [user]);
  

  return (
    <div className={(isMessageByUser ? "user-chat-block" : "foreign-chat-block")}>
      <p className="sender">{sender}</p>
      <div className="message">
        {message}
      </div>
    </div>
  )
}

export default ChatBlock
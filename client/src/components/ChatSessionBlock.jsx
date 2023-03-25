import ChatIcon from "../assets/svgs/chat.svg"

const ChatSessionBlock = ({name, participants}) => {
  return (
    <div className="chat-session-block active">
      <img src={ChatIcon} alt="chat icon" />
      <div className="text">
        <h1>{name}</h1>
        <p>{participants}</p>
      </div>
    </div>
  )
}

export default ChatSessionBlock
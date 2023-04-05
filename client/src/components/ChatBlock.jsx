
const ChatBlock = ({message, author}) => {
  return (
    <div className="chat-block">
      <p className="autor">{author}</p>
      <div className="message">
        {message}
      </div>
    </div>
  )
}

export default ChatBlock
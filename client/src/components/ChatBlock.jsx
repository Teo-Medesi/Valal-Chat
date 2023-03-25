
const ChatBlock = ({text, autor}) => {
  return (
    <div className="chat-block">
      <p className="autor">{autor}</p>
      <div className="message">
        {text}
      </div>
    </div>
  )
}

export default ChatBlock
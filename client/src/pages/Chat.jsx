import ChatBlock from "../components/ChatBlock"
import ChatSessionBlock from "../components/ChatSessionBlock"

const Chat = () => {
  return (
    <div className="chat-container">
      <div className="side-panel">
        <ChatSessionBlock name="test group" participants="tommy and bobby" />
      </div>
      <div className="chat">
        <div className="chat-blocks">
          <ChatBlock text="Yoooo," autor="Host"/>
          <ChatBlock text="This shit fire" autor="Host"/>
          <ChatBlock text="init?" autor="Host"/>
        </div>

        <input type="text" placeholder="Enter text here..."/>
      </div>
    </div>
  )
}

export default Chat
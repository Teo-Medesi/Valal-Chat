const JoinRoom = () => {
  return (
    <div className="room-container">
      <section className="first-panel">
        <div className="ribbon">Valal-Chat</div>
        <div className="input">
          <div className="input-form">
            <label>Username</label>
            <input type="text" placeholder="John" />
          </div>
          
          <div className="input-form">
            <label>Room</label>
            <input type="text" placeholder="robotics-101" />
          </div>
          
          <button>Join Room</button>
        </div>
      </section>
    </div>
  )
}

export default JoinRoom
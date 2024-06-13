// App.jsx
import "./style.css";
import io from "socket.io-client";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Chat from "./Chat";

const socket = io.connect("http://localhost:5173");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
      navigate("/chat");
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          !showChat ? (
            <div className="joinChatContainer">
              <h3>Join A Chat</h3>
              <input
                type="text"
                placeholder="John..."
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Room ID..."
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
              <button onClick={joinRoom}>Join A Room</button>
            </div>
          ) : null
        }/>
        <Route path="/chat/*" element={<Chat socket={socket} username={username} room={room} />} />
      </Routes>
    </div>
  );
}

export default App;

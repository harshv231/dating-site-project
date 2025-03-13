import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000/",{
  transports: ["websocket"],//i added this
});

const GlobalChat = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");

  //i added these
  useEffect(() => {
    socket.on("connect", () => console.log("Connected to WebSocket"));

    socket.on("disconnect", (reason) =>
      console.log("Disconnected:", reason)
    );

    return () => socket.disconnect(); // Cleanup on component unmount
  }, []);

  const joinRoom = () => {
    if (room.trim()) {
      socket.emit("join-room", room);
      setChatActive(true);
    } else {
      alert("Please enter a room name");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessages.trim() && room) {
      const messageData = { room, message: newMessages, username }; //here i added the username
      socket.emit("send-message", messageData);
      setNewMessages(""); // Clear input after sending
    } else {
      alert("Message cannot be empty or room not set");
    }
  };

  useEffect(() => {
    const handleMessageReceive = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("received-message", handleMessageReceive);

    return () => {
      socket.off("received-message", handleMessageReceive); // Cleanup listener on unmount
    };
  }, []);

  return (
    <div className="global-chat-container">
      {!chatActive ? (
        <div className="join-room-container">
          <input
            type="text"
            placeholder="Enter Room Name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <>
          <div className="message-container">
            {messages.map((msg, index) => ( //here i have done message to msg
              <div className="message" key={index}>   
                <h3>{msg.username}: {msg.message}</h3>
              </div>
            ))}
          </div>
          <div className="input-container">
            <form onSubmit={handleSubmit}>
              <input
                className="message-input"
                type="text"
                value={newMessages}
                placeholder="Type your message"
                onChange={(e) => setNewMessages(e.target.value)}
              />
              <button className="send-button" type="submit">
                Send
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalChat;


// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:8000/", {
//   transports: ["websocket"],
// });

// const GlobalChat = () => {
//   const [username, setUsername] = useState("");
//   const [room, setRoom] = useState("");
//   const [chatActive, setChatActive] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [newMessages, setNewMessages] = useState("");

//   useEffect(() => {
//     socket.on("connect", () => console.log("Connected to WebSocket"));
//     socket.on("disconnect", (reason) => console.log("Disconnected:", reason));

//     return () => socket.disconnect();
//   }, []);

//   const joinRoom = () => {
//     if (room.trim()) {
//       socket.emit("join-room", room);
//       setChatActive(true);
//     } else {
//       alert("Please enter a room name");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (newMessages.trim() && room) {
//       const messageData = { room, message: newMessages, username };
//       socket.emit("send-message", messageData);
//       setNewMessages("");
//     } else {
//       alert("Message cannot be empty or room not set");
//     }
//   };

//   useEffect(() => {
//     const handleMessageReceive = (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     };

//     socket.on("received-message", handleMessageReceive);

//     return () => {
//       socket.off("received-message", handleMessageReceive);
//     };
//   }, []);

//   return (
//     <div className="global-chat-container">
//       {!chatActive ? (
//         <div className="join-room-container">
//           <input
//             type="text"
//             placeholder="Enter Room Name"
//             value={room}
//             onChange={(e) => setRoom(e.target.value)}
//           />
//           <button onClick={joinRoom}>Join Room</button>
//         </div>
//       ) : (
//         <>
//           <div className="message-container">
//             {messages.map((msg, index) => (
//               <div className="message" key={index}>
//                 <h3>{msg.username}: {msg.message}</h3>
//               </div>
//             ))}
//           </div>
//           <div className="input-container">
//             <form onSubmit={handleSubmit}>
//               <input
//                 className="message-input"
//                 type="text"
//                 value={newMessages}
//                 placeholder="Type your message"
//                 onChange={(e) => setNewMessages(e.target.value)}
//               />
//               <button className="send-button" type="submit">
//                 Send
//               </button>
//             </form>
//           </div>
//         </>
//       )}
//       <style jsx>{`
//         .global-chat-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           background: #ffe6f2;
//           min-height: 100vh;
//           padding: 20px;
//         }

//         .join-room-container input, .message-input {
//           padding: 10px;
//           border: 2px solid #ff4c61;
//           border-radius: 20px;
//           font-size: 1rem;
//           outline: none;
//           margin-bottom: 10px;
//         }

//         .join-room-container button, .send-button {
//           background: #ff4c61;
//           color: white;
//           border: none;
//           padding: 10px 20px;
//           border-radius: 20px;
//           font-size: 1rem;
//           cursor: pointer;
//           transition: background 0.3s;
//         }

//         .join-room-container button:hover, .send-button:hover {
//           background: #ff6b81;
//         }

//         .message-container {
//           width: 100%;
//           max-width: 600px;
//           background: #fff;
//           border-radius: 20px;
//           padding: 20px;
//           box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//           overflow-y: auto;
//           max-height: 400px;
//         }

//         .message {
//           background: #ffebf1;
//           padding: 10px;
//           border-radius: 20px;
//           margin-bottom: 10px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default GlobalChat;

import React, { useEffect, useState,useRef } from "react";
import "./Chat.css";

import closeIcon from "../images/closeIcon.png";
import sendLogo from "../images/send.png";
import { user } from "../Join/Join.js";
import ReactScrollToBottom from "react-scroll-to-bottom";
import socketIo from "socket.io-client";
import Message from "../Message/Message";

let socket;

const ENDPOINT="http://localhost:4500/";

const Chat =  () => {
  const [id, setId] = useState("");
  const posts = React.useRef(null);
  const [messages, setMessages] = useState([]);


  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit('message', { message, id });
    document.getElementById("chatInput").value = "";
  };


  useEffect(() =>{
    socket = socketIo(ENDPOINT, { transports: ["websocket"] }); 
    socket.on("connect", () => {
      alert("Connected");
      setId(socket.id);
      posts.current =socket.id;
  
    });    
    socket.emit("joined", { user });
    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    return () => {
      // socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
    });
    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
    });
    socket.on("leave", (data) => {
      setMessages([...messages, data]);
    });
    return () => {
      // cleanup;
      socket.off();
    };
  }, [messages]);
  

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>Chat</h2>
          {/* <h1>{posts.current}</h1> */}
          <a href="/">
            {" "}
            <img src={closeIcon} alt="Close" />
          </a>
          {/* <h1>{user}</h1> */}
        </div>
        {/* <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            
            <Message
              user={item.tid==posts.current? "": item.user }
              message={item.message}
              classs={item.tid=== posts.current? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom> */}
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
            type="text"
            id="chatInput"
          />

          {/* <ReactScrollToBottom className="chatBox">
            {messages.map((item, i) => (
                {item}
            ))}
          </ReactScrollToBottom> */}

          <button onClick={send} className="sendBtn">
            <img src={sendLogo} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

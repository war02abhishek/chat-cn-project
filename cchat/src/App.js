import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Redirect,
  Link,
} from "react-router-dom";
import Chat from './component/Chat/Chat.js';
import Join from './component/Join/Join.js';




// import socketIo from "socket.io-client";
// const ENDPOINT = 'http://localhost:4500';
// const socket=socketIo(ENDPOINT,{transports:['websocket']})


const App = () => {
  // socket.on('connect',()=>{
  // })

  return (
    <Router>
      <Routes>

      <Route path="/" element={<Join/>} />
      <Route path="/chat" element={<Chat/>} />
      </Routes>
    </Router>
  );
}

export default App
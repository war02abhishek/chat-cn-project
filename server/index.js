import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
const PORT = 4500 || process.env.PORT;
const app = express();
app.use(cors());

const users = [{}];
const httpServer = createServer(app);


const io = new Server(httpServer, {
  /* options */
});


app.get("/", (req, res) => {
  res.send("Real TIme server");
});


io.on("connection", (socket) => {
  console.log("Connection established");

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;

    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: ` ${users[socket.id]} has joined`,
    });

    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat,${users[socket.id]} `,
    });
  });
  socket.on("disconnect", () => {

    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]}  has left`,
    });
  });


  socket.on("message", ({ message, id }) => {

    io.emit("sendMessage", { user: users[id], message, id });
  })
});


httpServer.listen(PORT, () => {
  console.log(`listening on server http://localhost:${PORT}`);
});

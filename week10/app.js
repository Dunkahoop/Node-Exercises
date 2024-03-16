import { port } from "./config.js";
import { Server } from "socket.io";
import express from "express";
import http from "http";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.static("public"));
let httpServer = http.createServer(app);
app.get("/", (req, res) => res.send("<h1>Hello World From Express</h1>"));
// Socket.io server
const io = new Server(httpServer, {});
// main socket routine
// io.on("connection", (socket) => console.log("new connection established"));
// io.on("connection", (socket) => {
//   console.log("new connection established");
//   socket.on("join", (client) => {
//     socket.name = client.name;
//     // use the room property to create a room
//     socket.join(client.room);
//     console.log(`${socket.name} has joined ${client.room}`);
//   });
// });
io.on("connection", (socket) => {
  console.log("new connection established");
  // client has joined
  socket.on("join", (client) => {
    socket.name = client.name;
    // use the room property to create a room
    socket.join(client.room);
    console.log(`${socket.name} has joined ${client.room}`);
    // send message to joining client
    socket.emit(
      "welcome",
      `Welcome ${socket.name}, currently there are ${getNumberOfUsersInRoom(
        client.room
      )} client(s) in the ${client.room} room`
    );
    // send message to rest of the room the client just joined
    socket
      .to(client.room)
      .emit("newclient", `${socket.name} has joined this room`);
  });
});
const getNumberOfUsersInRoom = (roomName) =>
  io.sockets.adapter.rooms.get(roomName).size;

// will pass 404 to error handler
app.use((req, res, next) => {
  const error = new Error("No such route found");
  error.status = 404;
  next(error);
});
// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});
httpServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});

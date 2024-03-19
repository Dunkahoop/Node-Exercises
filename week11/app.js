import { port } from "./config.js";
import { Server } from "socket.io";
import express from "express";
import http from "http";
const streetLights = [
    {streetName: 'Sesame St.', green: 12000, red: 7500, yellow: 3000},
    {streetName: 'Loving Blvd.', green: 22000, red: 5000, yellow: 2000},
    {streetName: 'Fleet St.', green: 9000, red: 10000, yellow: 1000}
]
   
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.static("public"));
let httpServer = http.createServer(app);
app.get("/", (req, res) => res.send("<h1>Hello World From Express</h1>"));
// Socket.io server
const io = new Server(httpServer, {});
// main socket routine
io.on("connection", (socket) => {
  console.log("new connection established");
  // client has joined
  socket.on("join", (client) => {
    socket.name = client.name;
    // use the room property to create a room
    socket.join(client.room);
    console.log(`${socket.name} has joined ${client.room}`);
    
    // Find the streetLight object that matches the streetName
    const streetLight = streetLights.find(light => light.streetName === client.streetName);
    
    if (streetLight) {
      // Include the streetName in the join message
      socket.emit(
        "welcome",
        `Welcome ${socket.name} to ${streetLight.streetName}, currently there are ${getNumberOfUsersInRoom(
          client.room
        )} client(s) in the ${client.room} room`
      );
      
      // Emit a turnLampOn message with the streetLight object
      io.to(client.room).emit('turnLampOn', streetLight);
    } else {
      socket.emit(
        "welcome",
        `Welcome ${socket.name}, currently there are ${getNumberOfUsersInRoom(
          client.room
        )} client(s) in the ${client.room} room`
      );
    }
    
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

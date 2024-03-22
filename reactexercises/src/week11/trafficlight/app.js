import { port } from "./config.js";
import { Server } from "socket.io";
import express from "express";
import http from "http";
const streetLights = [
    {streetName: 'Duncan', green: 12000, red: 7500, yellow: 3000},
    {streetName: 'Wade', green: 22000, red: 5000, yellow: 2000},
    {streetName: 'Info3139', green: 18000, red: 7000, yellow: 2500}
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
  socket.on("join", (client) => {//join front-end
    socket.join(client.street);//join room using street name
    console.log(client.street);
    
    const streetLight = streetLights.find((light) => light.streetName === client.street);//find corresponding street name in streetlight array
    console.log(streetLight);
    
    if (streetLight) socket.emit('turnLampOn', streetLight);//emit turnLampOn method, send streetlight to be turned on
  });
});

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

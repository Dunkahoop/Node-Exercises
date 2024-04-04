import matColours from "./matdes100colours.json" assert { type: "json" };
const registeredNames = [];

const handleJoin = (socket, client, io) => {
  let coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
  socket.name = client.name;
  socket.room = client.room;

  console.log(`color index: ${coloridx}`);

  if (registeredNames.map(name => name.name).includes(socket.name)) {
    console.log(`name ${socket.name} taken`);
    socket.emit(
      "nameTaken",
      "Sorry, that name is already taken. Please choose a different name."
    );
    console.log("\nNames:");
    registeredNames.map((name) => console.log(name.name));

    return;
  }

  // use the room property to create a room
  socket.join(client.room);
  console.log(`${socket.name} has joined ${client.room}`);

  registeredNames.push({name: socket.name, color: matColours.colours[coloridx]});

  const sizeofRoom = io.sockets.adapter.rooms.get(client.room).size;

  // send message to joining client
  socket.emit(
    "welcome",
    {text: `Welcome ${socket.name}, currently there are ${sizeofRoom} client(s) in the ${client.room} room`,
    color: `#707070`}
  );
  // send message to rest of the room the client just joined
  socket
    .to(client.room)
    .emit("newclient", {text: `${socket.name} has joined this room`, color: `#707070`});

  console.log(`Number of users: ${sizeofRoom}`);
  console.log("\nNames:");
  registeredNames.map((name) => console.log(`${name.name}, ${name.color}`));
};

const handleDisconnect = (socket) => {
  console.log(`disconnecting ${socket.name} from ${socket.room}`);
  const index = registeredNames.map(name => name.name).indexOf(socket.name);
  if (index > -1) {
    registeredNames.splice(index, 1);

    console.log(`${socket.name} has left`);
    socket.to(socket.room).emit("someoneLeft", {text: `${socket.name} has left`, color: `#707070`});
  }

  console.log("\nNames:");
  registeredNames.map((name) => console.log(name.name));
};

const handleTyping = (socket, client) => {
  console.log("emitting typing message");
  socket.to(client.room).emit("someoneistyping", `${client.name} is typing....`);
};

const handleMessage = (io, socket, client) => {
  //find client name in registeredNames, get color
  let color = registeredNames.find(x => x.name === client.name).color;
  
  console.log(`emitting ${client.message} with ${color}`);
  io.in(socket.room).emit("newmessage", {text: `${client.name}: ${client.message}`, color: color});
}

export default { handleJoin, handleDisconnect, handleTyping, handleMessage };

const registeredNames = [];

const handleJoin = (socket, client, io) => {
  //console.log(moment().format('YYYY-MM-DD'));
  socket.name = client.name;
  socket.room = client.room;

  if (registeredNames.includes(socket.name)) {
    console.log(`name ${socket.name} taken`);
    socket.emit(
      "nameTaken",
      "Sorry, that name is already taken. Please choose a different name."
    );

    console.log(
      `\nNumber of users: ${io.sockets.adapter.rooms.get(client.room).size}`
    );
    console.log("\nNames:");
    registeredNames.map((name) => console.log(name));

    return;
  }

  // use the room property to create a room
  socket.join(client.room);
  console.log(`${socket.name} has joined ${client.room}`);

  registeredNames.push(socket.name);

  const sizeofRoom = io.sockets.adapter.rooms.get(client.room).size;

  // send message to joining client
  socket.emit(
    "welcome",
    `Welcome ${socket.name}, currently there are ${sizeofRoom} client(s) in the ${client.room} room`
  );
  // send message to rest of the room the client just joined
  socket
    .to(client.room)
    .emit("newclient", `${socket.name} has joined this room`);

  console.log(`Number of users: ${sizeofRoom}`);
  console.log("\nNames:");
  registeredNames.map((name) => console.log(name));
};

const handleDisconnect = (socket) => {
  console.log(`disconnecting ${socket.name} from ${socket.room}`);
  const index = registeredNames.indexOf(socket.name);
  if (index > -1) {
    registeredNames.splice(index, 1);

    console.log(`${socket.name} has left`);
    socket.to(socket.room).emit("someoneLeft", `${socket.name} has left`);
  }
  //socket.leave(socket.room);

  console.log("\nNames:");
  registeredNames.map((name) => console.log(name));
};

export default { handleJoin, handleDisconnect };

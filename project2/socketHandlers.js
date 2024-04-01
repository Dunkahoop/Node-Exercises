const registeredNames = [];

const handleJoin = (socket, client, io) => {
  socket.name = client.name;

    if (registeredNames.includes(socket.name)) {
      socket.emit(
        "nameTaken",
        "Sorry, that name is already taken. Please choose a different name."
      );
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
};

const handleDisconnect = (socket) => {
  const index = registeredNames.indexOf(socket.name);
    if (index !== -1) {
      registeredNames.splice(index, 1);
      console.log(`${socket.name} has left`);
      socket.broadcast.emit('someoneLeft', `${socket.name} has left`);
    }
};


export default { handleJoin, handleDisconnect };

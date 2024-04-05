import matColours from "./matdes100colours.json" assert { type: "json" };
import moment from 'moment';
const registeredNames = [];
const rooms = [];

const handleJoin = (socket, client, io) => {
  let coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
  socket.name = client.name;
  socket.room = client.room;
  let userColor = matColours.colours[coloridx];

  console.log(`color index: ${coloridx}`);

  if (registeredNames.map(name => name.name).includes(socket.name)) {
    console.log(`name ${socket.name} taken`);
    socket.emit(
      "nameTaken",
      `name ${socket.name} is already taken`
    );
    console.log("\nNames:");
    registeredNames.map((name) => console.log(name.name));

    return;
  }

  if(!rooms.includes(client.room)) rooms.push(client.room);

  // use the room property to create a room
  socket.join(client.room);
  console.log(`${socket.name} has joined ${client.room}`);

  if(isColorUsed(userColor)) {
    do {
      coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
      userColor = matColours.colours[coloridx];
    } while (isColorUsed(userColor));
  }

  registeredNames.push({name: socket.name, room: socket.room, color: userColor});

  const sizeofRoom = io.sockets.adapter.rooms.get(client.room).size;

  // send message to joining client
  socket.emit(
    "welcome",
    {name: "Admin", room: socket.room, text: `Welcome ${socket.name}, currently there are ${sizeofRoom} client(s) in the ${client.room} room`,
    color: `#707070`, date: moment().format('h:mm:ss a')}
  );
  // send message to rest of the room the client just joined
  socket
    .to(client.room)
    .emit("newclient", {name: "Admin", room: client.room, text: `${socket.name} has joined this room`, color: `#707070`, date: moment().format('h:mm:ss a')});

  console.log(`Number of users: ${sizeofRoom}`);
  console.log("\nNames:");
  registeredNames.map((name) => console.log(`${name.name}, ${name.color}`));
};

const handleDisconnect = (socket) => {
  console.log(`disconnecting ${socket.name} from ${socket.room}`);
  const index = registeredNames.map(name => name.name).indexOf(socket.name);
  if (index > -1) {
    registeredNames.splice(index, 1);

    if(!registeredNames.map(name => name.room).includes(socket.name) && rooms.includes(socket.room)) {
      const roomIndex = rooms.indexOf(socket.room);
      rooms.splice(roomIndex, 1);
    }

    console.log(`${socket.name} has left`);
    socket.to(socket.room).emit("someoneLeft", {name: "Admin", room: socket.room, text: `${socket.name} has left`, color: `#707070`, date: moment().format('h:mm:ss a')});
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
  io.in(socket.room).emit("newmessage", {name: client.name, room: client.room, text: client.message, color: color, date: moment().format('h:mm:ss a')});
}

const handleConnection = (socket) => {
  socket.emit("connected", rooms)
  
}

const handleUpdateUsers = (socket) => {
  socket.emit("usersupdated", registeredNames);
}

function isColorUsed(color) {
  for(let i = 0; i < registeredNames.length; i++) {
      if(registeredNames[i].color === color) {
          return true;
      }
  }
  return false;
}


export default { handleJoin, handleDisconnect, handleTyping, handleMessage, handleConnection, handleUpdateUsers };

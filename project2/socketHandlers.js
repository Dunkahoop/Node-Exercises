import matColours from "./matdes100colours.json" assert { type: "json" };
import moment from 'moment';
const registeredUsers = [];
const rooms = [];

const handleJoin = (socket, client, io) => {
  let coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
  socket.name = client.name;
  socket.room = client.room;
  let userColor = matColours.colours[coloridx];

  console.log(`color index: ${coloridx}`);

  //emit an error message if a username is already in registeredUsers, cancel join
  if (registeredUsers.map(name => name.name).includes(socket.name)) {
    console.log(`name ${socket.name} taken`);
    socket.emit(
      "nameTaken",
      `name ${socket.name} is already taken`
    );
    console.log("\nNames:");
    registeredUsers.map((name) => console.log(name.name));

    return;
  }

  if(!rooms.includes(client.room)) rooms.push(client.room);

  // use the room property to create a room
  socket.join(client.room);
  console.log(`${socket.name} has joined ${client.room}`);

  //check if a color is already in use, if so change the color randomly until it is unique
  if(isColorUsed(userColor)) {
    do {
      coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
      userColor = matColours.colours[coloridx];
    } while (isColorUsed(userColor));
  }

  registeredUsers.push({name: socket.name, room: socket.room, color: userColor});

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
  registeredUsers.map((name) => console.log(`${name.name}, ${name.color}`));
};

const handleDisconnect = (socket) => {
  console.log(`disconnecting ${socket.name} from ${socket.room}`);
  //get index of user that jsut left
  const index = registeredUsers.map(user => user.name).indexOf(socket.name);
  if (index > -1) {//if user was found (index is not -1)
    registeredUsers.splice(index, 1);//remove user from registeredUses

    //if no registered users are in a room that is still in rooms, then it is removed from rooms
    if(!registeredUsers.map(user => user.room).includes(socket.room) && rooms.includes(socket.room)) {
      const roomIndex = rooms.indexOf(socket.room);
     rooms.splice(roomIndex, 1);
    }
    else {
      //send message to the rest of the room (if it still exists) that the client has left
    socket.to(socket.room).emit("someoneLeft", {name: "Admin", room: socket.room, text: `${socket.name} has left`, color: `#707070`, date: moment().format('h:mm:ss a')});
    }

    console.log(`${socket.name} has left`);
  }

  console.log("\nNames:");
  registeredUsers.map((name) => console.log(name.name));
};

const handleTyping = (socket, client) => {
  console.log("emitting typing message");
  socket.to(client.room).emit("someoneistyping", `${client.name} is typing....`);
};

const handleMessage = (io, socket, client) => {
  //find client name in registeredUsers, get color
  let color = registeredUsers.find(x => x.name === client.name).color;
  
  console.log(`emitting ${client.message} with ${color}`);
  io.in(socket.room).emit("newmessage", {name: client.name, room: client.room, text: client.message, color: color, date: moment().format('h:mm:ss a')});
}

const handleConnection = (socket) => {
  socket.emit("connected", rooms)
  
}

const handleUpdateUsers = (socket) => {
  socket.emit("usersupdated", registeredUsers);
}

function isColorUsed(color) {//looks at each registeredUsers' color value, returns true if match
  for(let i = 0; i < registeredUsers.length; i++) {
      if(registeredUsers[i].color === color) {
          return true;
      }
  }
  return false;
}


export default { handleJoin, handleDisconnect, handleTyping, handleMessage, handleConnection, handleUpdateUsers };

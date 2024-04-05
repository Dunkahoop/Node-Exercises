import React, { useEffect, useReducer, useState } from "react";
import Accessibility from "@mui/icons-material/Accessibility";
import theme from "./theme";
import io from "socket.io-client";
import ChatMsg from "./chatMsg";
import "./client.css";
import ChatBubbles from "../src/chat-bubbles.png";
import {
  AppBar,
  Autocomplete,
  Button,
  Card,
  CardContent,
  IconButton,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
export default function App() {
  const initialState = {
    name: "",
    room: "",
    msg: "",
    status: "",
    messages: [],
    socket: "",
    isTyping: false,
    typingMsg: "",
    message: "",
    rooms: [],
    names: [],
    socketConnected: false,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const [showJoin, setShowJoin] = useState(true);
  useEffect(() => {
    try {
      const socket = io.connect("localhost:5000", {
        forceNew: true,
        transports: ["websocket"],
        autoConnect: true,
        reconnection: false,
        timeout: 5000,
      });
      setState({
        socket: socket,
      });
      socket.on("connect_error", () => {
        setState({ status: "cannot connect - try again later" });
      });
      socket.on("welcome", addMessageToList);
      socket.on("nameTaken", onNameTaken);
      socket.on("newclient", addMessageToList);
      socket.on("someoneLeft", addMessageToList);
      socket.on("someoneistyping", onTyping);
      socket.on("newmessage", onNewMessage);
      socket.on("usersupdated", updateUsers);
      socket.on("connected", updateRooms);

      if (!socket || socket.io._readyState === "closed")
        socket.emit("disconnect", socket.room);
    } catch (err) {
      console.log(err);
      setState({ status: "some other problem occurred" });
    }
  }, []);
  const updateUsers = (users) => {
    setState({ names: users });
  };
  const updateRooms = (rooms) => {
    setState({ rooms: rooms });
  };
  const onButtonClick = () => {
    state.socket.emit(
      "join",
      { name: state.name, room: state.room },
      (err) => {}
    );
  };
  const onNameTaken = (nameTakenMsgFromServer) => {
    setState({ status: nameTakenMsgFromServer });
  };
  const addMessageToList = (msg) => {
    let messages = state.messages; // declared earlier in reducer or state hook
    messages.push(msg);
    setState({
      messages: messages,
    });
    setShowJoin(false);
  };
  const onTyping = (msg) => {
    if (msg.from !== state.name) {
      setState({
        typingMsg: msg,
      });
    }
  };
  // keypress handler for message TextField
  const onMessageChange = (e) => {
    setState({ message: e.target.value });
    if (state.isTyping === false) {
      state.socket.emit(
        "typing",
        { name: state.name, room: state.room, message: state.message },
        (err) => {}
      );
      setState({ isTyping: true }); // flag first byte only
    }
  };
  const onNewMessage = (msg) => {
    addMessageToList(msg);
    setState({ typingMsg: "" });
  };
  // enter key handler to send message
  const handleSendMessage = (e) => {
    if (state.message !== "") {
      state.socket.emit(
        "message",
        { name: state.name, room: state.room, message: state.message },
        (err) => {}
      );
      setState({ isTyping: false, message: "" });
    }
  };
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {setOpen(true); state.socket.emit("updateusers")};
  const handleCloseDialog = () => setOpen(false);
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar color="primary">
          <Typography variant="h6" color="inherit" textAlign={"center"}>
            INFO3139 Project 2
          </Typography>
          <section style={{ height: 90, width: 90, marginLeft: "auto" }}>
            <IconButton
              onClick={handleOpenDialog}
              style={{ display: showJoin ? "none" : "block" }}
            >
              <Accessibility
                style={{ color: "white", height: 70, width: 70 }}
              />
            </IconButton>
          </section>
        </Toolbar>
      </AppBar>
      {showJoin ? (
        <Card className="card">
          <CardContent>
            <CardMedia
              style={{
                padding: 20,
                alignContent: "center",
              }}
              component="img"
              image={ChatBubbles}
              alt="Chat Bubbles"
            />
            <Typography color="primary" fontSize={25} textAlign={"center"}>
              Sign In
            </Typography>
            <p />
            <TextField
              placeholder="Enter unique name"
              autoFocus={true}
              required
              value={state.name}
              onChange={handleChange("name")}
              error={state.status !== ""}
              helperText={state.status}
            />
            <p />
            <Autocomplete
              options={state.rooms}
              getOptionKey={(room) => room}
              onChange={(e, selection) => {
                setState({ room: selection });
              }}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Room" variant="outlined" />
              )}
            />
            <p />
            <TextField
              placeholder="Enter new room name"
              value={state.room}
              onChange={handleChange("room")}
            />
            <p />
            <Button
              variant="contained"
              disabled={
                state.name === undefined ||
                state.name === "" ||
                state.room === undefined ||
                state.room === ""
              }
              onClick={onButtonClick}
            >
              Join
            </Button>
          </CardContent>
        </Card>
      ) : null}
      <div>
        {!showJoin ? (
          <div style={{ paddingTop: "2vh", alignContent: "center" }}>
            <Typography textAlign={"center"} fontSize={25}>
              {state.room}
            </Typography>
            {state.messages.map((message, index) => (
              <ChatMsg
                msg={message}
                key={index}
                fromUser={message.name === state.name}
              />
            ))}
            <div style={{ bottom: 25, position: "fixed" }}>
              <TextField
                onChange={onMessageChange}
                placeholder="type something here"
                autoFocus={true}
                value={state.message}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                    e.target.blur();
                  }
                }}
              />
              <div>
                <Typography color="primary">{state.typingMsg}</Typography>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <Dialog open={open} onClose={handleCloseDialog} style={{ margin: 20 }}>
        <DialogTitle style={{ textAlign: "center" }}>Who's On?</DialogTitle>
        <DialogContent>
          {state.names.map((user, index) => (
            <div>
              
            <Typography key={index}><Accessibility style={{color: user.color, height: 20, width: 20, paddingRight: 5}}/>{user.name} is in {user.room}</Typography>
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

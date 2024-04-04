import React, { useEffect, useReducer, useState } from "react";
import theme from "./theme";
import io from "socket.io-client";
import ChatMsg from "./chatMsg";
import "./client.css";
import {
  Button,
  Card,
  CardContent,
  TextField,
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

      if (!socket || socket.io._readyState === "closed")
        socket.emit("disconnect", socket.room);
    } catch (err) {
      console.log(err);
      setState({ status: "some other problem occurred" });
    }
  }, []);
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
    setState({message: e.target.value})
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
        {name: state.name, room: state.room, message: state.message},
        (err) => {}
      );
      setState({ isTyping: false, message: "" });
    }
  };
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h6" color="inherit" textAlign={"center"}>
        INFO3139 Lab 18
      </Typography>
      {showJoin ? (
        <Card className="card">
          <CardContent>
            <TextField
              placeholder="Enter unique name here"
              autoFocus={true}
              required
              value={state.name}
              onChange={handleChange("name")}
              error={state.status !== ""}
              helperText={state.status}
            />
            <p />
            <TextField
              placeholder="Enter room name here"
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
          <div style={{ paddingTop: "2vh" }}>
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
            <ul>
              {state.messages.map((message, index) => (
                <ChatMsg msg={message} key={index} />
              ))}
            </ul>
            <div>
              <Typography color="primary">{state.typingMsg}</Typography>
            </div>
          </div>
        ) : null}
      </div>
    </ThemeProvider>
  );
}

import React, { useReducer, useState } from "react";
import theme from "./theme";
import io from "socket.io-client";
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
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const [showJoin, setShowJoin] = useState(true);
  const onButtonClick = () => {
    serverConnect();
  };
  const serverConnect = () => {
    try {
      const socket = io.connect("localhost:5000", {
        forceNew: true,
        transports: ["websocket"],
        autoConnect: true,
        reconnection: false,
        timeout: 5000,
      });
      socket.on("connect_error", () => {
        setState({ status: "cannot connect - try again later" });
      });
      socket.emit("join", { name: state.name, room: state.room }, (err) => {});
      socket.on("welcome", addMessageToList);
      socket.on("nameTaken", onNameTaken);
      socket.on("newclient", addMessageToList);
      socket.on("someoneLeft", addMessageToList);
    } catch (err) {
      console.log(err);
      setState({ status: "some other problem occurred" });
    }
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
            <ul>
              {state.messages.map((message, index) => (
                <Typography style={{ marginLeft: "5vw" }} key={index}>{message}</Typography>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </ThemeProvider>
  );
}

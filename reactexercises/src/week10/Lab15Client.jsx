import React, { useState, useReducer, useRef } from "react";
import theme from "../theme";
import SocketClient from "./socketclient";
import io from "socket.io-client";
import "../App.css";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Snackbar,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
export default function App() {
  const initialState = {
    name: "",
    room: "",
    msg: "",
    roomMsg: "",
    showMsg: false,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const effectRan = useRef(false);
  const onButtonClick = () => {
    if (effectRan.current) return;
    serverConnect();
    effectRan.current = true;
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
      socket.on("connect_error", () => {setState({msg: "cannot connect - try again later"});});
      socket.emit("join", { name: state.name, room: state.room }, (err) => {});
      socket.on("welcome", onWelcome);
      socket.on("newclient", newClientJoined);
      if (socket.io._readyState === "opening")
        setState({ msg: "trying to get connection...", showMsg: true });
    } catch (err) {
      console.log(err);
      setState({ msg: "some other problem occurred", showMsg: true });
    }
  };
  const onWelcome = (welcomeMsgFromServer) => {
    setState({ msg: welcomeMsgFromServer, showMsg: true });
  };
  const newClientJoined = (joinMsgFromServer) => {
    setState({ roomMsg: joinMsgFromServer, showMsg: true });
  };
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  const snackbarClose = () => {
    setState({ showMsg: false });
  };
  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <CardHeader
          title="Lab 15"
          color="inherit"
          style={{ textAlign: "center" }}
        />
        <CardContent>
          <TextField
            placeholder="Enter user's name here"
            value={state.name}
            onChange={handleChange("name")}
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
          <Snackbar
            open={state.showMsg}
            message={state.msg}
            autoHideDuration={4000}
            onClose={snackbarClose}
          />
        </CardContent>
      </Card>
      <div>
        {state.roomMsg ? (
          <div style={{ paddingTop: "2vh" }}>{state.roomMsg}</div>
        ) : null}
      </div>
    </ThemeProvider>
  );
}

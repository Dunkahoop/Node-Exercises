import React, { useEffect, useRef } from "react";
import { ListItem } from "@mui/material";
import Bubble from "./bubble";
import Triangle from "./triangle";
import "./App.css";
const ChatMsg = (props) => {
  const userRef = useRef(null);
  useEffect(() => {
    userRef.current.scrollIntoView(true);
  }, []);
  return (
    <div>
      <ListItem
        ref={userRef}
        style={props.fromUser ? { textAlign: "left", marginBottom: "2vh", display: 'flex', justifyContent: 'flex-end' } : { textAlign: "left", marginBottom: "2vh" }}
      >
        <Bubble msg={props.msg} color={props.msg.color} />
        <Triangle color={props.msg.color} alignTriangle={props.fromUser ? "82.3%" : "auto"}/>
      </ListItem>
      <p />
    </div>
  );
};
export default ChatMsg;

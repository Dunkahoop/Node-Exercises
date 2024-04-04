import React from "react";
import "./App.css";
const ChatMsg = (props) => {
  return (
    <div
      className="scenario-message"
      style={{ backgroundColor: props.msg.color }}
    >
      {props.msg.text}
    </div>
  );
};
export default ChatMsg;

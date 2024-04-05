import { Typography } from "@mui/material";
import "./App.css";
const Bubble = (props) => {
  return (
    <div className="userBubble" style={{ backgroundColor: props.color }}>
      <Typography style={{fontSize: 12}}>{props.msg.name} in the room {props.msg.room} said at {props.msg.date}:</Typography>
      <Typography>{props.msg.text}</Typography>
    </div>
  );
};
export default Bubble;

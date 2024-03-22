import io from "socket.io-client";
import "../App.css";
import { useEffect, useState, useRef, useReducer } from "react";
const TrafficLight = (props) => {
  const initialState = { msg: "", showMsg: false };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const [color, setColor] = useState();
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current) return;
    serverConnect();
    effectRan.current = true;

    setColor("red");//sets all lights to red
  }, []);

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
        setState({ msg: "failed" });
      });
      socket.emit("join", { street: props.street }, (err) => {});//join back-end
      console.log("joined");
      socket.on("turnLampOn", handleTurnLampOn);//turn on lamp with method
      if (socket.io._readyState === "opening")
        setState({ msg: "connecting...", showMsg: true });
    } catch (err) {
      console.log(err);
      setState({ msg: "error", showMsg: true });
    }
  };

  // lamp handler code, lamp data from server
  const handleTurnLampOn = async (lampData) => {
    setState({msg: "", showMsg: false});
    console.log("turning lamp on...");
    while (true) {
      // loop until browser closes
      await waitSomeSeconds(lampData.red, "green");
      await waitSomeSeconds(lampData.green, "yellow");
      await waitSomeSeconds(lampData.yellow, "red");
    }
  };

  const waitSomeSeconds = (waitTime, nextColorToIlluminate) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setColor(nextColorToIlluminate); // update state variable
        resolve();
      }, waitTime);
    });
  };

  const getStateColor = (c) => (color === c ? color : "white");

  return (
    <div>
      <div style={{ textAlign: "center", fontName: "Helvetica", paddingBottom: 10 }}>
        {state.msg}
      </div>
    <div className="light">
      <div
        className="lamp"
        style={{ backgroundColor: getStateColor("red"), margin: ".5rem" }}
      />
      <div
        className="lamp"
        style={{ backgroundColor: getStateColor("yellow"), margin: ".5rem" }}
      />
      <div
        className="lamp"
        style={{ backgroundColor: getStateColor("green"), margin: ".5rem" }}
      />
      <div style={{ textAlign: "center", fontName: "Helvetica" }}>
        {props.street}
      </div>
    </div>
    </div>
  );
};
export default TrafficLight;

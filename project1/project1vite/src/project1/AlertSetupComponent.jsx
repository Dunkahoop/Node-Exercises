import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import theme from "./theme";
import "../App.css";
import globe from "./globe.png";
//add localhost:5000/ to fetch to get working
export default function AlertSetupComponent(props) {
  const [resArr, setResArr] = useState([]);
  useEffect(() => {
    fetchAlerts();
  }, []);
  const fetchAlerts = async () => {
    try {
      props.setState({
        openSnackbar: true,
        message: "Attempting to load alerts from server...",
      });
      let response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: await JSON.stringify({ query: `query { project1_setup{results} }` }),
      });
      let json = await response.json();
      props.setState({
        message: `countries loaded`,
        openSnackbar: true,
      });
      setResArr(json.data.project1_setup.results.split("|"));
    } catch (error) {
      console.log(error);
      props.setState({
        msg: `Problem loading server data - ${error.message}`,
      });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <CardContent>
          <CardMedia
            component="img"
            height="258"
            length="258"
            image={globe}
            alt="Globe"
          />
          <p />
          <Typography color="text" align="center" fontSize={25}>
            Worldwide Travel Alerts
          </Typography>
          <p />
          {resArr.map((sentence, index) => (
            <Typography color="error" key={index}>{sentence}</Typography>
          ))}
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

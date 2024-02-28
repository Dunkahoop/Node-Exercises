import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Toolbar,
  Card,
  AppBar,
  CardHeader,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import theme from "./theme";
import "../App.css";
import globe from "./globe.png";
const Project1Component = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar color="primary" style={{ marginBottom: "5vh" }}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            INFO3139 - Project 1
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="card">
        <CardContent>
          <CardMedia component="img" height="240" image={globe} alt="Globe" />
          <p/>
          <Typography color="text" align="center" fontSize={25}>Worldwide Travel Alerts</Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
export default Project1Component;

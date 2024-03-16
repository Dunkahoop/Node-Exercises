import React from "react";
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
export default function Project1Component() {
  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <CardContent>
          <CardMedia component="img" height="258" length="258" image={globe} alt="Globe" />
          <p/>
          <Typography color="text" align="center" fontSize={25}>Worldwide Travel Alerts</Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

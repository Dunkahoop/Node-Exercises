import { ThemeProvider } from "@emotion/react";
import { Card, CardContent, CardHeader } from "@mui/material";
import theme from "../theme";
import TrafficLight from "./trafficlight";
import "../App.css";
export default function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardHeader
          title="Lab 16"
          color="inherit"
          style={{ textAlign: "center" }}
        />
        <CardContent>
          <div className="flex-container">
            <TrafficLight street="Duncan" />
            <TrafficLight street="Wade" />
            <TrafficLight street="Info3139" />
          </div>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

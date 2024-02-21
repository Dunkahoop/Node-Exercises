import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Toolbar,
  Card,
  AppBar,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import theme from "./theme";
import "../App.css";
// An example of a React Functional Component using JSX syntax
const FunctionalStateHookComponent = () => {
  const [word, setWord] = useState("");
  const [sentence, setSentence] = useState("This is your sentence: ");

  const handleChange = (event) => {
    setWord(event.target.value);
  };

  const handleClick = () => {
    setSentence(sentence + " " + word);
    setWord("");
  };

  const handleClear = () => {
    setSentence("This is your sentence: ");
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar color="secondary" style={{ marginBottom: "5vh" }}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            INFO3139 - MaterialUI
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="card">
        <CardHeader title="Sentence Builder" />
        <CardContent>
          <div>
            <p>{sentence}</p>
            <input type="text" value={word} onChange={handleChange} />
            <p></p>
            <button onClick={handleClick}>Add word</button>
            <button onClick={handleClear}>Clear sentence</button>
          </div>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
export default FunctionalStateHookComponent;

import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Toolbar,
  Card,
  AppBar,
  CardHeader,
  CardContent,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import theme from "./theme";
import "../../App.css";
const FunctionalStateHookComponent = () => {
  const [sentence, setSentence] = useState("Your Sentence:");

  const onChange = (e, selectedOption) => {
    selectedOption
    ? setSentence(sentence + " " + selectedOption)
    : setSentence("Your Sentence:");
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar color="secondary" style={{ marginBottom: "5vh" }}>
        <Toolbar>
          <Typography color="inherit">
            INFO3139 - MaterialUI
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="card">
        <CardHeader title="Sentence Builder with Autocomplete" />
        <CardContent>
          <Autocomplete
            id="words"
            options={words}
            getOptionLabel={(option) => option}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Available words"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <p/>
          <Typography data-testid="sentence">{sentence}</Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
const words = ["The", "Quick", "Brown", "Fox", "Jumps", "Over", "My", "Lazy", "Dog"];
export default FunctionalStateHookComponent;

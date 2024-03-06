import React, { useState, useReducer } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./project1/theme";
import {
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Snackbar,
} from "@mui/material";
import Project1Component from "./project1/project1component";
import AlertSetupComponent from "./project1/AlertSetupComponent";
import AdvisoryAddComponent from "./project1/AdvisoryAddComponent";
import AdvisoryListComponent from "./project1/AdvisoryListComponent";
export default function App() {
  const initialState = {
    message: "",
    openSnackbar: false,
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //idk if I need this, but keep for now
  const snackbarClose = () => {
    setState({
      openSnackbar: false,
    });
  }
  return (
    <ThemeProvider theme={theme}>
      <AppBar color="primary" style={{ marginBottom: "5vh" }}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            INFO3139 - Project 1
          </Typography>
          <IconButton
            onClick={handleClick}
            color="inherit"
            style={{ marginLeft: "auto", paddingRight: "1vh" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={NavLink} to="/home" onClick={handleClose}>
              Home
            </MenuItem>
            <MenuItem component={NavLink} to="/reset" onClick={handleClose}>
              Reset Data
            </MenuItem>
            <MenuItem component={NavLink} to="/add" onClick={handleClose}>
              Add Advisory
            </MenuItem>
            <MenuItem component={NavLink} to="/list" onClick={handleClose}>
              List Advisories
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Project1Component />} />
        <Route path="/home" element={<Project1Component />} />
        <Route path="/reset" element={<AlertSetupComponent setState={setState}/>} />
        <Route path="/add" element={<AdvisoryAddComponent setState={setState}/>} />
        <Route path="/list" element={<AdvisoryListComponent setState={setState}/>} />
      </Routes>
      <Snackbar
      open={state.openSnackbar}
      message={state.message}
      autoHideDuration={3000}
      onClose={snackbarClose}
      />
    </ThemeProvider>
  );
};

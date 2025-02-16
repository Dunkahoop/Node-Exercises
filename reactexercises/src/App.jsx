import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import SocketClient from "./week10/socketclient";
import theme from "./week7/class1/theme";
import {
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import MaterialUIEx3Component from "./week7/class1/materialuiexample3";
import MaterialUIEx5Component from "./week7/class2/materialuiexample5";
import MaterialUIEx6Component from "./week7/class2/materialuiexample6";
import MaterialUIEx7AComponent from "./week7/class2/materialuiexample7a";
import Lab13 from "./week7/class2/lab13";
import Lab15 from "./week10/Lab15Client";
import Lab16 from "./week11/street";
import Week13Exercise1 from "./week13/week13exercise1";
import Week13Exercise2 from "./week13/week13exercise2";
const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            INFO3139 - MaterialUI
          </Typography>
          <IconButton
            id="menubtn"
            onClick={handleClick}
            color="inherit"
            style={{ marginLeft: "auto", paddingRight: "1vh" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={NavLink} to="/home" onClick={handleClose}>
              Home
            </MenuItem>
            <MenuItem component={NavLink} to="/ex3" onClick={handleClose}>
              Exercise #3
            </MenuItem>
            <MenuItem component={NavLink} to="/ex6" onClick={handleClose}>
              Exercise #6
            </MenuItem>
            <MenuItem component={NavLink} to="/ex7a" onClick={handleClose}>
              Exercise #7
            </MenuItem>
            <MenuItem component={NavLink} to="/lab13" onClick={handleClose}>
              Lab 13
            </MenuItem>
            <MenuItem component={NavLink} to="/lab15" onClick={handleClose}>
              Lab 15
            </MenuItem>
            <MenuItem component={NavLink} to="/lab16" onClick={handleClose}>
              Lab 16
            </MenuItem>
            <MenuItem component={NavLink} to="/lab20" onClick={handleClose}>
              Lab 20 #1
            </MenuItem>
            <MenuItem component={NavLink} to="/lab20part2" onClick={handleClose}>
              Lab 20 #2
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<MaterialUIEx5Component />} />
        <Route path="/home" element={<MaterialUIEx5Component />} />
        <Route path="/ex3" element={<MaterialUIEx3Component />} />
        <Route path="/ex6" element={<MaterialUIEx6Component />} />
        <Route path="/ex7a" element={<MaterialUIEx7AComponent />} />
        <Route path="/lab13" element={<Lab13 />} />
        <Route path="/lab15" element={<Lab15 />} />
        <Route path="/lab16" element={<Lab16 />} />
        <Route path="/lab20" element={<Week13Exercise1/>} />
        <Route path="/lab20part2" element={<Week13Exercise2/>} />
      </Routes>
    </ThemeProvider>
  );
};
export default App;

//import SocketClient from "./week10/socketclient";
// import AllRooms from "./week10/allrooms";
// function App() {
//  return (
//  <div>
//  <AllRooms />
//  </div>
//  );
// }
// export default App;

// import { QueryClient, QueryClientProvider } from "react-query";
// import ReactQueryExample from "./week8/reactqueryexample";
// const queryClient = new QueryClient();
// const App = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ReactQueryExample />
//     </QueryClientProvider>
//   );
// };
// export default App;

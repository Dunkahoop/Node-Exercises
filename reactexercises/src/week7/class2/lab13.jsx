import React, {useReducer, useEffect} from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Snackbar,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import theme from "../../theme";
import "../../App.css";
const lab13 = () => {
  const initialState = {
    msg: "",
    snackBarMsg: "",
    contactServer: false,
    users: [],
    names: [],
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      setState({
        contactServer: true,
        snackBarMsg: "Attempting to load users from server...",
      });
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ query: "query { users{name,age,email} }" }),
      });
      let json = await response.json();
      setState({
        snackBarMsg: `users loaded`,
        users: json.data.users,
        contactServer: true,
        names: json.data.users.map((a) => a.name),
      });
    } catch (error) {
      console.log(error);
      setState({
        msg: `Problem loading server data - ${error.message}`,
      });
    }
  };
  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      msg: `${state.users.length} users loaded`,
      contactServer: false,
    });
  };
  const onChange = (e, selectedOption) => {
    if (selectedOption) setState({
      msg: `You selected ${selectedOption.name}. This user's email is ${selectedOption.email}`
    });
    else setState({msg: ""});
  };
  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <CardHeader
          title="Lab 13 - Search for User"
          color="inherit"
          style={{ textAlign: "center" }}
        />
        <CardContent>
        <Autocomplete
            id="users"
            options={state.users}
            getOptionLabel={(user) => user.name}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Users"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <p/>
          <Typography color="primary">{state.msg}</Typography>
        </CardContent>
      </Card>
      <Snackbar
        open={state.contactServer}
        message={state.snackBarMsg}
        autoHideDuration={3000}
        onClose={snackbarClose}
      />
    </ThemeProvider>
  );
};
export default lab13;

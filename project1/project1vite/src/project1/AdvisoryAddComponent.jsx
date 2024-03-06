import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import theme from "./theme";
import "../App.css";
import globe from "./globe.png";
export default function AdvisoryAddComponent(props) {
  const [travelerName, setTravelerName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [advisories, setAdvisories] = useState([]);
  useEffect(() => {
    fetchCountries();
  }, []);
  const fetchCountries = async () => {
    try {
      props.setState({
        openSnackbar: true,
        message: "Attempting to load countries from server...",
      });
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: await JSON.stringify({
          query: `query { alerts{country, name, text, date, region, subregion} }`,
        }),
      });
      let json = await response.json();
      props.setState({
        message: `${Object.keys(json.data.alerts).length} countries loaded`,
        openSnackbar: true,
      });
      setAdvisories(json.data.alerts);
    } catch (error) {
      console.log(error);
      props.setState({
        message: `Problem loading server data - ${error.message}`,
      });
    }
  };
  const addAdvisory = async () => {
    try {
      props.setState({
        openSnackbar: true,
        message: "Attempting to add travel advisory...",
      });
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: await JSON.stringify({
          query: `mutation{addadvisory(name: "${travelerName}", country: "${selectedCountry}") { name, country, text, date }}`,
        }),
      });
      let json = await response.json();

      props.setState({
        message: `advisory added on ${json.data.addadvisory.date}`,
        openSnackbar: true,
      });
      setTravelerName("");
      setSelectedCountry("");
    } catch (error) {
      console.log(error);
      props.setState({
        message: `Problem adding advisory - ${error.message}`,
      });
    }
  };
  const onSelectCountry = (e, selectedOption) => {
    selectedOption
      ? setSelectedCountry(selectedOption.name)
      : setSelectedCountry("");
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
          <Typography
            color="text"
            align="center"
            fontSize={20}
            fontWeight="bold"
          >
            Add Advisory
          </Typography>
          <p />
          <TextField
            value={travelerName}
            onChange={(e) => setTravelerName(e.target.value)}
            placeholder="Traveller's Name"
          />
          <p />
          <Autocomplete
            options={advisories}
            getOptionLabel={(advisory) => advisory.name}
            onChange={onSelectCountry}
            inputValue={selectedCountry}
            renderInput={(params) => (
              <TextField
                {...params}
                label="countries"
                variant="outlined"
                margin="normal"
                fullWidth
              />
            )}
          />
          <p />
          <Button
            disabled={
              selectedCountry === "" || travelerName === "" ? true : false
            }
            variant="contained"
            onClick={addAdvisory}
          >
            Add Advisory
          </Button>
          <p />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Autocomplete,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import theme from "./theme";
import "../App.css";
import globe from "./globe.png";
export default function AdvisoryListComponent(props) {
  const [selected1, setSelected1] = useState(null);
  const [selected2, setSelected2] = useState(null);
  const [selected3, setSelected3] = useState(null);
  const [advisories, setAdvisories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [subregions, setSubRegions] = useState([]);
  const [travellers, setTravellers] = useState([]);
  //may need to remove
  // useEffect(() => {
  //   fetchCountriesByRegion("Europe");
    
  // }, []);
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
          query: `query { alerts{ name, text, date } }`,
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
  const fetchTravellers = async () => {
    try {
      props.setState({
        openSnackbar: true,
        message: "Attempting to load travellers from server...",
      });
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: await JSON.stringify({
          query: `query { travellers }`,
        }),
      });
      let json = await response.json();
      props.setState({
        message: `${Object.keys(json.data.travellers).length} travellers loaded`,
        openSnackbar: true,
      });
      setTravellers(json.data.travellers);
    } catch (error) {
      console.log(error);
      props.setState({
        message: `Problem loading server data - ${error.message}`,
      });
    }
  };
  const fetchTravellersByName = async (name) => {
    try {
      props.setState({
        openSnackbar: true,
        message: "Attempting to load alerts from server...",
      });
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: await JSON.stringify({
          query: `query($name: String) { travellersbyname(name: $name){ name,country, text, date} }`,
          variables: {name: name}
        }),
      });
      let json = await response.json();
      props.setState({
        message: `loaded ${Object.keys(json.data.travellersbyname).length} alerts for ${name}`,
        openSnackbar: true,
      });
      setAdvisories(json.data.travellersbyname);
    } catch (error) {
      console.log(error);
      props.setState({
        message: `Problem loading server data - ${error.message}`,
      });
    }
  }
  const fetchCountriesByRegion = async (region) => {
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
          query: `query($region: String) { alertsforregion(region: $region){ name, country, text, date } }`,
          variables: {region: region}
        }),
      });
      let json = await response.json();
      props.setState({
        message: `${Object.keys(json.data.alertsforregion).length} regions loaded`,
        openSnackbar: true,
      });
      setAdvisories(json.data.alertsforregion);
    } catch (error) {
      console.log(error);
      props.setState({
        message: `Problem loading server data - ${error.message}`,
      });
    }
  };
  const fetchCountriesBySubRegion = async (subregion) => {
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
          query: `query($subregion: String) { alertsforsubregion(subregion: $subregion){name, country, text, date}}`,
          variables: {subregion: subregion}
        }),
      });
      let json = await response.json();
      props.setState({
        message: `${Object.keys(json.data.alertsforsubregion).length} subregions loaded`,
        openSnackbar: true,
      });
      setAdvisories(json.data.alertsforsubregion);
    } catch (error) {
      console.log(error);
      props.setState({
        message: `Problem loading server data - ${error.message}`,
      });
    }
  };
  const fetchRegions = async () => {
    try {
      props.setState({
        openSnackbar: true,
        message: "Attempting to load regions from server...",
      });
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: await JSON.stringify({
          query: `query { regions }`,
        }),
      });
      let json = await response.json();
      props.setState({
        message: `${Object.keys(json.data.regions).length} regions loaded`,
        openSnackbar: true,
      });
      setRegions(json.data.regions);
    } catch (error) {
      console.log(error);
      props.setState({
        message: `Problem loading server data - ${error.message}`,
      });
    }
  };
  const fetchSubRegions = async () => {
    try {
      props.setState({
        openSnackbar: true,
        message: "Attempting to load subregions from server...",
      });
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: await JSON.stringify({
          query: `query { subregions }`,
        }),
      });
      let json = await response.json();
      props.setState({
        message: `${
          Object.keys(json.data.subregions).length
        } subregions loaded`,
        openSnackbar: true,
      });
      setSubRegions(json.data.subregions);
    } catch (error) {
      console.log(error);
      props.setState({
        message: `Problem loading server data - ${error.message}`,
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
          <FormControl>
            <FormLabel>List Advisories By:</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value="traveller"
                control={<Radio />}
                onChange={(e) => {
                  fetchTravellers();
                  setSelected1(e.target.value);
                  setSelected2(false);
                  setSelected3(false);
                  setAdvisories([]);
                }}
                label="Traveller"
              />
              <FormControlLabel
                value="region"
                control={<Radio />}
                onChange={(e) => {
                  fetchRegions();
                  setSelected2(e.target.value);
                  setSelected1(false);
                  setSelected3(false);
                  setAdvisories([]);
                }}
                label="Region"
              />
              <FormControlLabel
                value="subregion"
                control={<Radio />}
                onChange={(e) => {
                  fetchSubRegions();
                  setSelected3(e.target.value);
                  setSelected2(false);
                  setSelected1(false);
                  setAdvisories([]);
                }}
                label="Sub-Region"
              />
            </RadioGroup>
          </FormControl>
          <p />
          {selected1 && (
            <Autocomplete
              options={travellers}
              getOptionLabel={(traveller) => traveller}
              onChange={(e, selection) => {fetchTravellersByName(selection);}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="travellers"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              )}
            />
          )}
          {selected2 && (
            <Autocomplete
              options={regions}
              getOptionLabel={(region) => region}
              onChange={(e, selection) => {fetchCountriesByRegion(selection);}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="regions"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              )}
            />
          )}
          {selected3 && (
            <Autocomplete
              options={subregions}
              getOptionLabel={(subregion) => subregion}
              onChange={(e, selection) => {fetchCountriesBySubRegion(selection);}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="subregions"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              )}
            />
          )}
          <p />
          {(selected1 || selected2 || selected3) && (
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight="bold">Country</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight="bold">
                        Alert Information
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {advisories.map((advisory, index) => (
                    <TableRow key={index}>
                      <TableCell>{advisory.name}</TableCell>
                      <TableCell align="right">
                        {advisory.text} {advisory.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

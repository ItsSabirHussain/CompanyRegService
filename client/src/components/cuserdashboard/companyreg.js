import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import Review from "./Review";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import validator from "validator";

const uploadButton = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function CompanyReg(props) {
  const [cdata, setcdata] = useState({
    ID: localStorage.getItem("cuserID"),
    CompanyName: "",
    UserName: "",
    Address: "",
    Type: "",
    CEOName: "",
    Headquarter: "",
    Date: ""
  });
  const classes = useStyles();
  const uButton = uploadButton();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = e => {
    e.preventDefault();
    if (validator.isEmpty(cdata.CompanyName)) {
      alert("Company Name Must Required");
    } else if (validator.isEmpty(cdata.UserName)) {
      alert("User Name Must Required");
    } else if (validator.isEmpty(cdata.Address)) {
      alert("Address Must Required");
    } else if (validator.isEmpty(cdata.Type)) {
      alert("Type Must Required");
    } else if (validator.isEmpty(cdata.CEOName)) {
      alert("CEO Name Must Required");
    } else if (validator.isEmpty(cdata.Headquarter)) {
      alert("Headquarter Must Required");
    } else if (validator.isEmpty(cdata.Date)) {
      alert("Date Must Required");
    } else {
      axios
        .post("/compreq", cdata)
        .then(res => {
          props.history.push("/cuserdashboard");
        })
        .catch(error => {
          alert("Error occur check you information and try again.");
        });
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <br></br>
      <main className={classes.layout}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Paper className={classes.paper}>
          <Typography top="5" component="h1" variant="h4" align="center">
            Company Registration Requests
          </Typography>
          <br></br>
          <br></br>
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Enter Company Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="companyname"
                  name="companyname"
                  label="Company Name"
                  fullWidth
                  autoComplete="cname"
                  onChange={e => {
                    setcdata({ ...cdata, CompanyName: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="projectname"
                  name="projectname"
                  label="User Name"
                  fullWidth
                  autoComplete="pname"
                  onChange={e => {
                    setcdata({ ...cdata, UserName: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="projectdescription"
                  name="projectdescription"
                  label="Address"
                  fullWidth
                  autoComplete="pdescription"
                  onChange={e => {
                    setcdata({ ...cdata, Address: e.target.value });
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="Type"
                  fullWidth
                  autoComplete="city"
                  onChange={e => {
                    setcdata({ ...cdata, Type: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name="state"
                  label="CEO Name"
                  fullWidth
                  onChange={e => {
                    setcdata({ ...cdata, CEOName: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Headquarter"
                  fullWidth
                  autoComplete="Headquarter"
                  onChange={e => {
                    setcdata({ ...cdata, Headquarter: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Date"
                  fullWidth
                  autoComplete="country"
                  onChange={e => {
                    setcdata({ ...cdata, Date: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </React.Fragment>
          <React.Fragment>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={uButton.button}
            >
              Submit
            </Button>
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}

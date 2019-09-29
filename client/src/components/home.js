import React, { useState } from "react";
import "./styles/home.css";
import desktopImage from "./img/homebackground.jpg";
import mobileImage from "./img/homebackground.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import { NavigationBar } from "./navigationBar";
import { Jumbotron } from "./jumbotron.js";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { resetWarningCache } from "prop-types";
import Button from "@material-ui/core/Button";

const buttonStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  center: {
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Home = props => {
  const classes = useStyles();

  const imageUrl = window.innerWidth >= 650 ? desktopImage : mobileImage;
  const bStyles = buttonStyles();
  const [cname, setcname] = useState("");

  const onClick = e => {
    e.preventDefault();
    axios
      .post("/check", { Name: cname })
      .then(res => {
        if (res.data.message === "Yes") {
          alert("Sorry! company name already exits.");
        } else {
          alert(
            "Congrats! your concern company name is available you may register your self and the apply for company registration."
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavigationBar />
      <Jumbotron />
      <div
        className="App"
        style={{
          backgroundColor: "white",
          backgroundImage: `url(${imageUrl})`
        }}
      >
        <div className="App-content">
          <h1 style={{ color: "white" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div className={bStyles.center}>
                <Typography
                  variant="h4"
                  gutterBottom
                  style={{ color: "black" }}
                >
                  Enter Company Name
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="companyname"
                      name="companyname"
                      label=""
                      fullWidth
                      autoComplete="cname"
                      onChange={e => {
                        setcname(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={onClick}
                    >
                      Check
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;

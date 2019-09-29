import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import validator from "validator";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

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
export default function PaymentForm(props) {
  const uButton = uploadButton();
  const classes = useStyles();
  const [cardData, setCardData] = useState({
    Name: "",
    Number: "",
    EDate: "",
    CVV: ""
  });

  const handleNext = e => {
    e.preventDefault();
    if (validator.isEmpty(cardData.Name)) {
      alert("Company Name Must Required");
    } else if (validator.isEmpty(cardData.Number)) {
      alert("User Name Must Required");
    } else if (validator.isEmpty(cardData.EDate)) {
      alert("Date Must Required");
    } else if (validator.isEmpty(cardData.CVV)) {
      alert("Type Must Required");
    } else {
      axios
        .post("/payment", {
          ID: localStorage.getItem("cuserID")
        })
        .then(res => {
          props.history.push("/cuserdashboard");
        })
        .catch(error => {
          alert("Error occur check you information and try again.");
        });
    }
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Typography variant="h6" gutterBottom>
          Payment
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              label="Name on card"
              fullWidth
              onChange={e => setCardData({ ...cardData, Name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              label="Card number"
              fullWidth
              onChange={e =>
                setCardData({ ...cardData, Number: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              label="Expiry date"
              fullWidth
              onChange={e =>
                setCardData({ ...cardData, EDate: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              onChange={e => setCardData({ ...cardData, CVV: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={uButton.button}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </main>
    </React.Fragment>
  );
}

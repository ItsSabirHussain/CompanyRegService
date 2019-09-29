import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/promandashboard" style={{ textDecoration: "none" }}>
        Complex Bid Module Integration{" "}
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

export default function ModifyProject(props) {
  const classes = useStyles();
  const [proInfo, setProInfo] = useState({
    _id: "",
    ProjectName: "",
    ID: "",
    Suggestion: "",
    Cost: "",
    RiskFactor: "",
    CompanyName: "",
    Reason: ""
  });
  useEffect(() => {
    if (proInfo.ProjectName === "") {
      axios
        .post("/getadata", { _id: localStorage.getItem("e_id") })
        .then(res => {
          console.log(res);
          setProInfo({
            ...proInfo,
            ProjectName: res.data.ProjectName,
            CompanyName: res.data.CompanyName,
            ID: res.data.ID,
            Suggestion: res.data.Suggestion,
            Cost: res.data.Cost,
            _id: res.data._id,
            RiskFactor: res.data.RiskFactor
          });
          console.log(res);
        })
        .catch(error => console.log(error));
    }
  });
  const onClick = e => {
    e.preventDefault();
    axios
      .post("/updatebidstatus", {
        ProjectName: proInfo.ProjectName,
        CompanyName: proInfo.CompanyName,
        ID: proInfo.ID,
        Bid: proInfo.Cost,
        Reason: proInfo.Reason,
        Status: "Accepted"
      })
      .then(res => {
        alert("Action completed.");
      })
      .catch(error => {
        alert(error);
      });
    props.history.push("/ceodashboard");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Analysis Data
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="projectname"
                variant="outlined"
                required
                fullWidth
                id="project name"
                label={"Project Name " + proInfo.ProjectName}
                autoFocus
                onChange={e =>
                  setProInfo({ ...proInfo, ProjectName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="projectname"
                variant="outlined"
                required
                fullWidth
                id="project name"
                label={"Company Name " + proInfo.CompanyName}
                autoFocus
                onChange={e =>
                  setProInfo({ ...proInfo, CompanyName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="uID"
                label={"User ID " + proInfo.ID}
                name="ID"
                autoComplete="ID"
                onChange={e => setProInfo({ ...proInfo, ID: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="suggestion"
                label={"Suggestion " + proInfo.Suggestion}
                name="suggestion"
                autoComplete="suggestion"
                onChange={e =>
                  setProInfo({ ...proInfo, Suggestion: e.target.value })
                }
              />
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="suggestion"
                  label={"Cost " + proInfo.Cost}
                  name="suggestion"
                  autoComplete="suggestion"
                  onChange={e =>
                    setProInfo({ ...proInfo, Cost: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="suggestion"
                label={"Risk Factor " + proInfo.RiskFactor}
                name="suggestion"
                autoComplete="suggestion"
                onChange={e =>
                  setProInfo({ ...proInfo, RiskFactor: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="suggestion"
                label={"Reason " + proInfo.Reason}
                name="suggestion"
                autoComplete="suggestion"
                onChange={e =>
                  setProInfo({ ...proInfo, Reason: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onClick}
            >
              Accept
            </Button>
          </Grid>

          <Grid container justify="flex-end">
            <Grid item></Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

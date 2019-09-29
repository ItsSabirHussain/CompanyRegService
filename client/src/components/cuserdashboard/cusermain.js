import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Active Tax Service
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
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

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

export default function Main(props) {
  const classes = useStyles();
  const [cuser, setCuser] = React.useState({
    FullName: "",
    Email: "",
    ACN: "",
    CompanyName: "",
    Status: ""
  });

  useEffect(() => {
    if (cuser.FullName === "") {
      axios
        .post("/getcuser", { ID: localStorage.getItem("cuserID") })
        .then(res => {
          console.log(res);
          setCuser({
            Email: res.data.Email,
            FullName: res.data.FullName,
            ACN: res.data.ACN,
            CompanyName: res.data.CompanyName,
            Status: res.data.Status
          });
          console.log(res);
        })
        .catch(error => console.log(error));
    }
  });

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <div>
              <Jumbotron>
                <h1 className="display-6">User Name : {cuser.FullName}</h1>
                <p className="lead">Email : {cuser.Email}</p>
                <p className="lead">Company Name : {cuser.CompanyName}</p>
                <p className="lead">ACN : {cuser.ACN}</p>
                <p className="lead">Company Status : {cuser.Status}</p>
                <hr className="my-2" />
                <p></p>
                <p className="lead"></p>
              </Jumbotron>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Copyright />
    </main>
  );
}

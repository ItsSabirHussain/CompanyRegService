import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import Main from "./cusermain";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PublishIcon from "@material-ui/icons/Publish";
import Modifications from "./updatecompany";
import Notifications from "./notifications";
import PaymentForm from "./PaymentForm";
import CompanyReg from "./companyreg";
import UpdatePro from "./updatecompany";
import Upload from "./Upload";
import FileUpload from "./fileupload";

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

export default function CUserDashboard(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [cuser, setCuser] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (localStorage.getItem("cuserTokken")) {
      setCuser(localStorage.getItem("cuserID"));
    } else {
      props.history.push("/cuserlogin");
    }
  });

  const onClick = e => {
    e.preventDefault();
    localStorage.removeItem("cuserTokken");
    localStorage.removeItem("cuserID");
    props.history.push("/cuserlogin");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {"Client Dashboard with ID " + cuser}
          </Typography>
          <IconButton onClick={onClick} color="inherit">
            <Badge color="secondary">
              <ExitToAppIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem button component={Link} to="/cuserdashboard">
              <ListItemIcon>
                <DashboardIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/cuserdashboard/notifications"
            >
              <ListItemIcon>
                <PublishIcon fontSize="large" />
              </ListItemIcon>

              <ListItemText primary="Notifications" />
            </ListItem>
            <ListItem button component={Link} to="/cuserdashboard/companyreg">
              <ListItemIcon>
                <PeopleIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Company Reg." />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/cuserdashboard/updateproject"
            >
              <ListItemIcon>
                <PermIdentityIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Update Company" />
            </ListItem>
            <ListItem button component={Link} to="/cuserdashboard/payment">
              <ListItemIcon>
                <PermIdentityIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Payment" />
            </ListItem>
            <ListItem button component={Link} to="/cuserdashboard/fileupload">
              <ListItemIcon>
                <PermIdentityIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="File Upload" />
            </ListItem>
          </div>
        </List>
        <Divider />
      </Drawer>

      <Switch>
        <Route exact path="/cuserdashboard" component={Main} />
        <Route
          exact
          path="/cuserdashboard/notifications"
          component={Notifications}
        />
        <Route exact path="/cuserdashboard/companyreg" component={CompanyReg} />
        <Route
          exact
          path="/cuserdashboard/updateproject"
          component={UpdatePro}
        />
        <Route exact path="/cuserdashboard/payment" component={PaymentForm} />

        <Route
          exact
          path="/cuserdashboard/updatecompany"
          component={Modifications}
        />
        <Route exact path="/cuserdashboard/fileupload" component={FileUpload} />
      </Switch>
    </div>
  );
}

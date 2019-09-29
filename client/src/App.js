import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Home from "./components/home.js";
import CUserLogin from "./components/cuserlogin";
import CEOLogin from "./components/ceologin";
import CEOReg from "./components/ceoreg";
import CUserReg from "./components/cuserreg";
import AdminDashboard from "./components/admindashboard/admindashboard";
import CUserDashboard from "./components/cuserdashboard/cuserdashboard";

function App({ history }) {
  return (
    <div>
      <Router>
        <Switch history={history}>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/cuserlogin" component={CUserLogin} />
          <Route exact path="/ceologin" component={CEOLogin} />
          <Route exact path="/cuserreg" component={CUserReg} />
          <Route exact path="/ceoreg" component={CEOReg} />
          <Route path="/ceodashboard" component={AdminDashboard} />
          <Route path="/cuserdashboard" component={CUserDashboard} />

          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

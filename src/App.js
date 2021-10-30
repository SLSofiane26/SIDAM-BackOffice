import "./App.css";
import { Component, Fragment } from "react";
import Layout from "./Layout";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as ACTIONS from "./Login/Actions.js";
import User from "./Admin/User";
import Logout from "./Logout";
import Login from "./Login/Login";
import Users from "./Admin/Users";
import Ammo from "./Admin/Ammo";
import Weapons from "./Admin/Weapons";
import ArmsYield from "./Admin/ArmsYield";
import ValidatedWeapons from "./Admin/ValidatedWeapons";
import AddUser from "./Admin/AddUser";
import Home from "./Admin/Home";
import WeaponsModification from "./Admin/WeaponsModification";
import Mailing from "./Admin/Mailing";
import NotificationUsers from "./Admin/NotificationUsers";
import Garantie from "./Admin/Garantie";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    if (!this.props.token) {
      this.props.history.push("/");
    }
    this.props.handleCheick();
  };
  componentDidUpdate = (prevProps, prevState) => {
    this.props.handleCheick();
  };

  render() {
    return (
      <Fragment>
        <Layout>
          {this.props.token ? (
            <Switch>
              <Route path="/home" component={Home} exact />
              <Route path="/users" component={User} exact />
              <Route path="/weapons" component={Weapons} exact />
              <Route path="/user/:id" component={Users} exact />
              <Route path="/ammo/:id" component={Ammo} exact />
              <Route path="/arms-yield" component={ArmsYield} exact />
              <Route path="/garantie" component={Garantie} exact />
              <Route
                path="/weaponsmodification/:id"
                component={WeaponsModification}
                exact
              />
              <Route
                path="/validated-weapons"
                component={ValidatedWeapons}
                exact
              />
              <Route path="/" component={Home} exact />
              <Route path="/mailing" component={Mailing} exact />
              <Route path="/notification" component={NotificationUsers} exact />
              <Route path="/add-user" component={AddUser} exact />
              <Route path="/logout" component={Logout} exact />
            </Switch>
          ) : (
            <Route path="/" component={Login} exact />
          )}
        </Layout>
      </Fragment>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    handleCheick: () => dispatch(ACTIONS.CheikAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import http from "./services/httpService";
import { api } from "./config.js";
import Dashboard from "./components/dashboard";
import Jumbotron from "./components/common/jumbotron";
import NotFound from "./components/not-found";
import NewPost from "./components/createPost.jsx";
import Log from "./components/log";
import Logout from "./components/logout";
import Register from "./components/register";
import NavBar from "./components/navbar";
import ProtectedRoute from "./components/common/protectedRoute";
import PostPage from "./components/PostPage";

class App extends Component {
  state = {};

  async componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user_jwt = jwtDecode(jwt);
      const user = await http.get(`${api.usersEndPoint}${user_jwt._id}`);
      this.setState({ user: user.data });
    } catch (ex) {}
  }

  handleRedirectToLogin = () => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    console.log(this.state.user === undefined);
    return (
      <div>
        <NavBar user={this.state.user} />
        <Switch>
          <Route path="/users/login" component={Log} />
          <Route path="/users/register" component={Register} />
          <Route path="/users/logout" component={Logout} />
          <Route
            path="/dashboard"
            render={() =>
              this.state.user !== undefined ? (
                <Dashboard user={this.state.user} />
              ) : (
                this.handleRedirectToLogin()
              )
            }
          />
          <Route path="/not-found" component={NotFound} />
          <ProtectedRoute
            path="/new-post"
            render={(props) => <NewPost {...props} user={this.state.user} />}
          />
          <Route
            path="/post/:id"
            render={(props) => <PostPage {...props} user={this.state.user} />}
          />
          <Route exact path="/" component={Jumbotron} />
          <Redirect from="/users" to="/users/login " />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

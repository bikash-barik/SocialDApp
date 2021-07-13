import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "../src/pages/home/Home";
import Login from "../src/pages/login/Login";
import Register from "../src/pages/register/Register";
import Connection from "../src/pages/Connection/Connection";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";
// import Network from "./components/Network";
import Messages from "../src/pages/Massages/Massages";
function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/Connection" >
            <Connection />
          </Route>
          <Route path="/Massages">
            <Messages />
          </Route>
          <Route path="/Job">
            <Header />
          </Route>
          <Route path="/Notifications">
            <Header />
          </Route>
          <Route path="/Register">
            <Header />
            <Register />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

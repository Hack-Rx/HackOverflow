// main file

import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "./static/styles/reset.css";
import "./static/styles/errors.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Food from "./components/Food/Food";
import FoodSearch from "./components/Food/FoodSearch";
import AddFood from "./components/Food/AddFood";
import EditFood from "./components/Food/EditFood";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Weight from "./components/Weight/Weight";
import User from "./components/User/User";
import PrivateRoute from "./components/RouteProtectors/PrivateRoute";
import SemiPrivateRoute from "./components/RouteProtectors/SemiPrivateRoute";
import NotFound from "./components/404/NotFound";

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      errors: []
    };
  }

  isAuth = async () => {
    const res = await fetch("/api/isLoggedIn", { method: "POST", headers: { "accepts": "application/json" } });
    const auth = await res.json();
    await this.setState({ isLoggedIn: auth.isLoggedIn });
    return this.state.isLoggedIn;
  }

  HTMLErrorMapper = () => {

    const mappedValues = this.state.errors.map(
      (error, index) => {
        return (
          <div key={index} id={index} className="error">
            <span className="errorMessage"> {error} </span>
            <span onClick={(e) => this.removeError(e)} className="errorClose">Close</span>
          </div>
        );
      }
    );

    const HTML = () => {
      return (
        <div id="errors" style={this.state.errors.length === 0 ? { display: "none" } : { display: "flex" }}>
          {mappedValues}
        </div>
      );
    }

    return HTML();

  }

  removeError = (e) => this.setState({ errors: this.state.errors.filter((error) => error !== e.target.previousElementSibling.innerText) });

  updateErrors = (errors) => this.setState({ errors });

  render() {
    return (
      <BrowserRouter>
        <Navbar isAuthenticated={this.state.isLoggedIn} /> 
        {this.HTMLErrorMapper()}
        <Switch>

          <Route exact path="/" render={() => <Home isAuthenticated={this.isAuth} />} />
          <PrivateRoute exact path="/food" isAuthenticated={this.isAuth} updateErrors={this.updateErrors} Component={Food} />
          <PrivateRoute exact path="/food/searchfood/mealtype/:mealtype/date/:date" isAuthenticated={this.isAuth} updateErrors={this.updateErrors} Component={FoodSearch} />
          <PrivateRoute exact path="/food/fooditem/:fdcId/mealtype/:mealType/date/:date" isAuthenticated={this.isAuth} updateErrors={this.updateErrors} Component={AddFood} />
          <PrivateRoute exact path="/food/editfood/:fdcId/mealtype/:mealType/date/:date/calories/:calories" isAuthenticated={this.isAuth} updateErrors={this.updateErrors} Component={EditFood} />
          <PrivateRoute exact path="/user/settings" isAuthenticated={this.isAuth} updateErrors={this.updateErrors} Component={User} />
          <PrivateRoute exact path="/weight" isAuthenticated={this.isAuth} updateErrors={this.updateErrors} Component={Weight} />
          <SemiPrivateRoute exact path="/signup" isAuthenticated={this.isAuth} updateErrors={this.updateErrors} Component={Signup} />
          <SemiPrivateRoute exact path="/login" isAuthenticated={this.isAuth} updateErrors={this.updateErrors} Component={Login} />
          <Route exact path="/*" render={() => <NotFound isAuthenticated={this.isAuth} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Main;

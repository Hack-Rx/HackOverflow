// Created by Deepak Jain
// Some parts copied from https://www.free-css.com/free-css-templates/page249/yamifood


import React from "react";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      loading: true
    };

  }

  async componentDidMount() {
   /**
   * @var isAuthenticated,
   * @type Function: Returns Boolean
   */
    const authResult = await this.props.isAuthenticated();
    if(authResult) await this.setState({isAuth:true});
    if(!authResult) await this.setState({isAuth:false});
    await this.setState({loading:false});
  }

  /*
  name RedirectOptions,
  @type Function : HTML || JSX,
  work : Depending on the data redirect to the appropriate location.
  */
  RedirectOptions = () => {
    const {path, Component, updateErrors} = this.props;
    const {isAuth, loading} = this.state;
    const loadingStyle = { fontSize:"1.8em", height:"calc(100vh - 70px)",width:"100vw",display:"flex", justifyContent:"center" , alignItems:"center"};

    if(loading) return <span style={loadingStyle} > Loading... </span>;

    if(isAuth) {
      return  <Route exact path={path} render={(props) => <Component updateErrors={updateErrors} {...props}  /> } />
    } else {
      return <Redirect to="/login" />
    }

  }

  render() {
    return <React.Fragment> {this.RedirectOptions()} </React.Fragment>
  }

}

export default PrivateRoute;

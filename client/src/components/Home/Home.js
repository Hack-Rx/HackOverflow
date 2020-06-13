// Created by Kirti Sharma
// Some parts copied from https://www.free-css.com/free-css-templates/page249/yamifood


import React from "react";
import "../../static/styles/index.css";
import appmain from "../../static/images/appmain.svg";
import food from "../../static/images/food.svg";
import man from "../../static/images/like.svg";
import progress from "../../static/images/bicycle.svg";
import {Link} from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    };
  }

  async componentDidMount() {
    const authResult = await this.props.isAuthenticated();
    if(authResult) await this.setState({isAuth: true});
    if(!authResult) await this.setState({isAuth: false});
  }


   /*
  name isLoggedIn,
  @type Function : HTML || JSX,
  work : Show sign up links if the user is not authenticated otherwise do not display sign up info.
  */

  isLoggedIn = () => {
    if (!this.state.isAuth) {
      return (
        <div id="introPortal">
          <Link to="/signup" className="portalSignUp">Sign Up</Link>
          <span id="portalOr">or</span>
          <Link to="/login" className="portalLogin">Login</Link>
        </div>
      );
    }
  }


  render() {
    return(
      <main id="index">

        <div id="indexContainerOne">
          <div id="indexIntro">
            <h3 id="introHeading">Hello there! Welcome to U-Fit,<br></br> your health analyst.</h3>
            
            {this.isLoggedIn()}
          </div>
          <img alt="" id="indexIntroImage" src={appmain} width="200" height="200" />
         
        </div>
        

        <div id="indexContainerTwo">
          <h3 id="introCalories">What prototype contains</h3>
          <div className="caloriesReason">
            <img alt="" className="caloriesReasonImage" src={food} width="200" height="200" />
            <div className="reasonContainer">
              <h4 className="caloriesReasonHeading">Prevent Binge Eating:</h4>
              <p>U-FIT maintains the food log of the meals you had in a day. According to your health goals and status, it predicts the count of calorie intake suitable for you. Furthermore, it gives you a chance to track the calories consumed in a day through food log which would make you conscious of your diet and prevent you from overeating</p>
            </div>
          </div>

          <div className="caloriesReason">
            <img alt="" className="caloriesReasonImage" src={progress} width="200" height="200" />
            <div className="reasonContainer">
              <h4 className="caloriesReasonHeading">Active and Informed:</h4>
              <p>Along with U-FIT, you can easily know what nutrient value does your food store. It tells you about the fats carbs and protein intake and lets you know what should be taken in an optimum amount for your better health</p>
            </div>
            
          </div>

          <div className="caloriesReason">
            <img alt="" className="caloriesReasonImage" src={man} width="200" height="200" />
            <div className="reasonContainer">
              <h4 className="caloriesReasonHeading">Detailed insight into your food:</h4>
              <p>Tracking calories can take a small amount of time which will allow you to think clearly if you actually want to eat this food and why.</p>
            </div>
          </div>

        </div>
      </main>
    );
  }

}


export default Home;

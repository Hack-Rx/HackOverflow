// Created by Kirti Sharma
// Some parts copied from https://www.free-css.com/free-css-templates/page249/yamifood


import React from "react";
import "../../static/styles/signup.css";
import male from "../../static/images/male.svg";
import female from "../../static/images/female.svg";
import submitForm from "../../helpers/Form";


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genderSelected: "Male",
      firstName: "",
      lastName: "",
      email: "",
      age: 21,
      password: "",
      weight: 80,
      goalWeight:70,
      calorieGoal: 1900
    };
  }
  /* 
    name maleSelected,
    @type Function : Void,
    work : Set the gender to male.
  */
  maleSelected = () => this.setState({ genderSelected: "Male" });

   /* 
    name femaleSelected,
    @type Function : Void,
    work : Set the gender to female.
  */
  femaleSelected = () => this.setState({ genderSelected: "Female"});

  render() {
    const maleSelected = this.state.genderSelected === "Male" ? { background: "#b9f2ff", padding: "15px" } : { background: "white", padding: "0px" };
    const femaleSelected = this.state.genderSelected === "Female" ? { background: "lightpink", padding: "15px" } : { background: "white", padding: "0px" };
    return (

      <form method="POST" onSubmit={ async (e) => await submitForm(
        e,
        "POST",
        "/signup",
        { 'Content-Type': 'application/json' },
        true,
        "/food",
        this.props.history,
        {
          genderSelected : this.state.genderSelected,
          firstName :this.state.firstName,
          lastName : this.state.lastName,
          email :this.state.email,
          age : this.state.age,
          password : this.state.password,
          weight: this.state.weight,
          goalWeight: this.state.goalWeight,
          calorieGoal:this.state.calorieGoal
        },
        this.props.updateErrors,
        (result) => { }
      )} id="signup" >


        <h2 id="signupHeading">Sign Up</h2>
        <div className="inputField">
          <label className="inputFieldLabel">First Name</label>
          <span ><input onChange={(e) => this.setState({firstName:e.target.value}) } required name="firstName" type="text" placeholder="First Name" /></span>
        </div>

        <div className="inputField">
          <label className="inputFieldLabel">Last Name</label>
          <input onChange={(e) => this.setState({lastName:e.target.value})} required type="text" placeholder="Last Name" name="lastName" />
        </div>

        <div className="inputField">
          <label className="inputFieldLabel">Email</label>
          <input onChange={(e) => this.setState({email:e.target.value})} required type="email" name="email" placeholder="Email" />
        </div>

        <div className="inputField">
          <label className="inputFieldLabel">Password</label>
          <input onChange={(e) => this.setState({password:e.target.value}) } required type="password" name="password" placeholder="Password" autoComplete="on" />
        </div>

        <div id="tap">Tap or Click To Choose</div>

        <div id="inputFieldSpecial">
          <div className="flex-inner-wrapper">
            <div id="maleCheck" style={maleSelected} onClick={() => this.maleSelected()}>
              <span id="maleLabel">Male</span>
              <input type="radio" name="gender" id="male" />
              <img alt="" src={male} width="100" id="maleImage" />
            </div>
            <div id="genderMiddle">
              <div id="or">or</div>
            </div>
            <div id="femaleCheck" style={femaleSelected} onClick={() => this.femaleSelected()}>
              <span id="femaleLabel">Female</span>
              <input type="radio" name="gender" id="female" />
              <img alt="" src={female} width="80" id="femaleImage" />
            </div>
          </div>
        </div>

        <div className="inputField">
          <label className="inputFieldLabel">Age</label>
          <input onChange={(e) => this.setState({age: e.target.value})} required type="number" min="16" step="1" name="age" placeholder="Age" />
        </div>

        <div className="inputField">
          <label className="inputFieldLabel">Weight (Kg)</label>
          <input id="12" onChange={(e) => this.setState({weight: e.target.value}) } required type="number" step="0.1" min="10" max="700" name="weight" placeholder="Weight" />
        </div>

        <div className="inputField">
          <label className="inputFieldLabel">Goal Weight (Kg)</label>
          <input id="13" onChange={(e) => this.setState({goalWeight:e.target.value})} required type="number" step="0.1" min="10" max="700" name="goalWeight" placeholder="Goal Weight" />
        </div>
        {document.getElementById("12")-document.getElementById("13")==0 ? null : (document.getElementById("12")-document.getElementById("13")>0 ? (<h1>1500</h1>) : (<h1>2000</h1>)) 
          
        }
        <div className="inputField">
          <label className="inputFieldLabel">Calorie Goal</label>
          <input id="14" onChange={(e) => this.setState({calorieGoal:e.target.value}) } required type="number" step="50" min="1000" max="20000" name="calorieGoal" placeholder="Calorie Goal" />
        </div>

        <input type="submit" value="Sign Up" className="signupSubmit" />
      </form>
    );
  }

}


export default Signup;
// Created by Deepak Jain
// Some parts copied from https://www.free-css.com/free-css-templates/page249/yamifood

import React from "react";
import "../../static/styles/foodsearch.css";
import { Link } from "react-router-dom";
import submitForm from "../../helpers/Form";
const Clarifai = require('clarifai');
const clarifai = new Clarifai.App({
  apiKey: 'c15d3dba1f5645ff8e2a9e8eb19f8150',
});


class FoodSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mealType: this.props.match.params.mealtype,
      date :this.props.match.params.date,
      foods : [],
      query : ""
    };
  }

  /*
    name displayFood
    work : Returns list of food from the FoodCentral API.
    
*/

 

  displayFood = () => {
    return (
      this.state.foods.map((food, index) => {
        return (
          <div key={index} className="food">
            <Link key={index * 50 * parseInt(food.fdcId)} className={`${food.fdcId.toString()} foodItem`} 
              to={`/food/fooditem/${food.fdcId.toString()}/mealtype/${this.state.mealType}/date/${this.state.date}`}>
              {food.description}
            </Link>
          </div>
        )
      })
    )
  }
  render() {
   

    const name = async () => {
      console.log("ji1");
      console.log(document.getElementById("myFileInput").value);
      clarifai.models.predict("bd367be194cf45149e75f01d59f77ba7", "https://www.kingarthurflour.com/sites/default/files/styles/featured_image/public/recipe_legacy/20-3-large.jpg").then(
    function(response) {
      // do something with response
      console.log("ji1");
      let pred = response.outputs[0].data.concepts[0].name;
      console.log(pred);
      document.getElementById("foodQuery").value=pred;
      console.log("ji1");
    },
    function(err) {
      // there was an error
    }
  );
      //let predictions = await clarifai.models.predict(Clarifai.FOOD_MODEL, document.getElementById("myFileInput").baseURI);
      
  }
    
    return (
      <div id="foodSearchContainer">


        <input id="myFileInput" type="file" accept="image/*;capture=camera"></input>
        <input id="myFileInput1" type="submit" onClick={name}></input>
        
        
        <form onSubmit={async (e) => await submitForm(
          e, "POST",  `/food/searchfood/${this.state.query === "" ? "User entered nothing in the query." : this.state.query}`,
          { 'Content-Type': 'application/json' },
          false, "/",
          this.props.history,
          {},
          this.props.updateErrors,
          async (result) => {
            const { foods } = result;
            await this.setState({ foods});
          }
        )

        } id="searchContainer">
            

          <label htmlFor="foodQuery">Search Food</label>
          <input type="search" name="query" id="foodQuery" placeholder="Search Food" onChange={(e) => this.setState({ query: e.target.value })} />
          <button id="search" type="submit">Search</button>
        </form>

        <main id="foodsearch">
          {this.displayFood()}
        </main>
      </div>
    );
  }


}


export default FoodSearch;
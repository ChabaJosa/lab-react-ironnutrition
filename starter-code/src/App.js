import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import "./App.css"
import foods from './foods.json';
import FoodBox from "./FoodBox"
import Search from "./Search"
import TodaysFood from './TodaysFood';


const allFoods = foods

class App extends Component {

  state = {
    food: allFoods,
    allFoods: allFoods
  }


  handleSubmit = (state,e) => {
    e.preventDefault()
    state.foodForm = false; // This is the Child's state

    let newMeal = {name:state.name,calories:state.calories,image:state.img,quantity:0}
    
    let newStateFood = [...this.state.food] // This is a copy of the App js state
    newStateFood.push(newMeal)
    
    this.setState({  // Sets the state to current file
      food: newStateFood
    })
  } // Prevents the submit refresh default in FoodBox.js
  // Takes the state (of foodBox because it's passed as a prop) as parameter and the event
  // then it adds {name:state.name,calories:state.calories,image:state.img,quantity:0} to a copy of the App state
  // Then sets the copy as the state 

  searchBoxFood = (state) => {
    console.log(state)
    let searchFood = state.food
    console.log(searchFood)
    this.setState({
      food:searchFood
    })
    
  } // sets the state to the food in the state of Search.js

  addToList = foodIndex => {
    let newStateFood = [...this.state.food]
    newStateFood[foodIndex].listed=true
    newStateFood[foodIndex].quantity+=1
    console.log(newStateFood[foodIndex])
    this.setState({
      food:newStateFood,
      allFoods: allFoods
    })
  } // Gets the food index from FoodBox.js
  // Sets the state to the changed quantity


  render() {
    // console.log("render App.js",this.state.food[0].name,this.state.food[0].listed)
    return (
      <div className="App container">

        <h1>IronNutrition</h1>
        <br></br>

        <div className="columns">
          <div className="column is-half">

            <Search
              foodsProp       = {this.state.allFoods} // Using all foods so that we do not change the full array of objs
              searchBoxFood   = {this.searchBoxFood}
            />
            <br></br>

            <FoodBox
              foodsProp       = {this.state.food}
              handleSubmit    = {this.handleSubmit}
              addToList       = {this.addToList}
            />
            
          </div>

          <div className="column is-half">
            <TodaysFood
              currentState    = {this.state.food}
            />
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;

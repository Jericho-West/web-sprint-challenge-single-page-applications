import React from "react";
import { Route, Link } from "react-router-dom"
import { useHistory } from "react-router-dom";
import { useState } from "react";
import schema from "./fs";
import * as yup from "yup"
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const ife= {
    nameinput: ""
  }

  let [formValues, setFormValues] = useState({nameinput: ""})
  let [formErrors, setFormErrors] = useState(ife)
  let [disabled, setDisabled] = useState(false)

  const validate = (name, value) => {
    yup.reach(schema, name)
    .validate(value)
    .then(() => setFormErrors({...formErrors, [name]: ""}))
    .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
  }

  const change = (evt) => {
    const { name, value } = evt.target
    validate(name, value)

    setFormValues(
      {...formValues, [name]: value}
      )
}



useEffect (() => {
schema.isValid(formValues).then(x => setDisabled(!x))
}, [formValues])


  
const history = useHistory()
  
  const pizza = () => {
    history.push("/pizza")
  }

let pancake = false

if (disabled) {
  pancake = "name must be at least 2 characters"
} else {
  pancake = ""
}

  return (
    <>
      <h1>Lambda Eats</h1>


      <Link to="/">Home</Link>
      <Link to="/pizza">Pizza Form</Link>

      <Route exact path = "/">

      <button onClick={pizza} id="order-pizza">Order</button>

      </Route>
      <Route path = "/pizza">
        <form id="pizza-form">

        <label>Name: </label>
        <input 
        value={formValues.nameinput}
        type="text"
        name = "nameinput"
        id = "name-input" 
        onChange={change}
        placeholder="name"
        />

        <select id="size-dropdown">
          <option value = "Small">Small</option>
          <option value = "Medium">Medium</option>
          <option value = "Large">Large</option>
        </select>
        
        <label>Pepperoni</label>
        <input
        type="checkbox" 
        name="pepperoni"
        value="pepperoni"
        />
                <label>Mushroom</label>
        <input
        type="checkbox" 
        name="mushroom"
        value="mushroom"
        />
                <label>Pineapple</label>
        <input
        type="checkbox" 
        name="pineapple"
        value="pineapple"
        />
                <label>Salt</label>
        <input
        type="checkbox" 
        name="salt"
        value="salt"
        />

<label>Special Instructions: </label>
        <input 
        value={formValues.seinput}
        type="text"
        name = "specialtext"
        id = "special-text" 
        onChange={change}
        placeholder="type here"
        />

<input type="button" value="Add to Order" disabled={disabled} />

        </form>
        <div className="pancake">{pancake}</div>
      </Route>
    </>
  );
};
export default App;

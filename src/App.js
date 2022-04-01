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

        <input 
        value={formValues.nameinput}
        type="text"
        name = "nameinput"
        id = "name-input" 
        onChange={change}
        placeholder="name"
        />





<input type="submit" value="Submit" disabled={disabled} />
        </form>
        <div class="pancake">{pancake}</div>
      </Route>
    </>
  );
};
export default App;

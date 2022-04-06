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
    nameinput: "",
    specialtext: ""
  }

  let [formValues, setFormValues] = useState({nameinput: "", specialtext: "", pepperoni: false, mushroom: false, pineapple: false, salt: false, size: "Small"})
  let [formErrors, setFormErrors] = useState(ife)
  let [disabled, setDisabled] = useState(false)
  let [post, setPost] = useState([])



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

const change2 = (evt) => {
  const { name, value } = evt.target 

  setFormValues(
    {...formValues, [name]: !!value}
    )
}

const change3 = (evt) => {
  const { name, value } = evt.target 

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

const sub = (a) => {

  let newPost = {
name: formValues.nameinput.trim(),
size: "Small",
pepperoni: false,
mushroom: false,
pineapple: false,
salt: false,
special: ""
  }

  newPost = {
    name: formValues.nameinput.trim(),
    size: formValues.size,
    pepperoni: formValues.pepperoni,
    mushroom: formValues.mushroom,
    pineapple: formValues.pineapple,
    salt: formValues.salt,
    special: formValues.specialtext.trim()
      }

  postNew(newPost)
}



const postNew = (newPost0) => {

  axios.post(`https://reqres.in/api/orders`, newPost0)
 .then(x => {
 setPost(x.data)
 })
 .catch(err => console.log(err))
 .finally(() => setFormValues(ife), [])
}

const z = (e) => {
  e.preventDefault()
}

console.log(post)
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

        <select id="size-dropdown" value={formValues.size} name="size" onChange={change3}>
          <option value = "Small" >Small</option>
          <option value = "Medium" >Medium</option>
          <option value = "Large">Large</option>
        </select>
        
        <label>Pepperoni</label>
        <input
        type="checkbox" 
        name="pepperoni"
        value="pepperoni"
        onChange={change2}
        />
                <label>Mushroom</label>
        <input
        type="checkbox" 
        name="mushroom"
        value="mushroom"
        onChange={change2}
        />
                <label>Pineapple</label>
        <input
        type="checkbox" 
        name="pineapple"
        value="pineapple"
        onChange={change2}
        />
                <label>Salt</label>
        <input
        type="checkbox" 
        name="salt"
        value="salt"
        onChange={change2}
        />

<label>Special Instructions: </label>
        <input 
        value={formValues.specialtext}
        type="text"
        name = "specialtext"
        id = "special-text" 
        onChange={change}
        placeholder="type here"
        />

<button type="button" name="submit" value="Add to Order" id="order-button" disabled={disabled} onClick={sub} onSubmit={z}>Submit</button>

        </form>
        <div className="pancake">{pancake}</div>

        <pre>{JSON.stringify(post, null, 2)}</pre>
      </Route>
    </>
  );
};
export default App;

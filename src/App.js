import React from "react";
import { Route, Link } from "react-router-dom"
import { useHistory } from "react-router-dom";
import { useState } from "react";

const App = () => {
  let [formValues, setFormValues] = useState({nameinput: ""})

  const change = (evt) => {
    const { name, value } = evt.target

    setFormValues({...formValues, [name]: value})

    console.log("SPAGHETTI")
  }


const history = useHistory()
  

  const pizza = () => {
    history.push("/pizza")
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

        />






        </form>
      </Route>
    </>
  );
};
export default App;

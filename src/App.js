import React from "react";
import { Route, Link } from "react-router-dom"
import { useHistory } from "react-router-dom";

const App = () => {
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







        </form>
      </Route>
    </>
  );
};
export default App;

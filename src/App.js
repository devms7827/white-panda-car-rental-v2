import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import PreviewDetails from "./components/Details";
import BookingForm from "./components/Form";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={Dashboard} exact />
        <Route path="/details/:id" component={PreviewDetails} exact />
        <Route path="/book/:id" component={BookingForm} exact />
      </div>
    </BrowserRouter>
  );
}

export default App;

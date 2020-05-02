import React, { Component, Fragment } from "react";
import Footer from "../Footer";
import CarList from "../List";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="list-heading">Cars for rent</div>
          <hr className="list-hr" />
          <CarList />
          <Footer />
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;

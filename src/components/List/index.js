import React, { Component, Fragment } from "react";
import ListCard from "./card";
import { store } from "../../index";

class CarList extends Component {
  state = {
    storeData: [],
  };

  componentDidMount() {
    const storeData = store.getState();
    this.setState({
      storeData: storeData.carList,
    });
  }

  render() {
    const { storeData } = this.state;

    return (
      <Fragment>
        <div className="list-body">
          <div className="list-subheading">
            <span className="list-subheading__col1">Car Details</span>
            <span className="list-subheading__col2">Rent per day</span>
          </div>

          {/* Iterating to print all list of cars */}
          {storeData &&
            storeData.length &&
            storeData.length > 0 &&
            storeData.map((carData, idx) => {
              return <ListCard data={carData} key={idx} />;
            })}
        </div>
      </Fragment>
    );
  }
}

export default CarList;

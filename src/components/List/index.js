import React, { Component, Fragment } from "react";
import ListCard from "./card";
import { store } from "../../index";
import Loading from "../Loading";
import axios from "axios";
import serverLink from "../../serverLink";

class CarList extends Component {
  state = {
    storeData: [],
  };

  componentDidMount() {
    this.getCarsList();
    // const storeData = store.getState();
    // this.setState({
    //   storeData: storeData.carList,
    // });
  }

  getCarsList = () => {
    // Now we will call the backend api to get cars list from the online database!
    axios.get(serverLink).then((result) => {
      const { data } = result;
      if (data && data.status && data.status == 1) {
        if (data.payload.list.length > 0) {
          this.setState({
            storeData: data.payload.list,
          });
        } else {
          alert(
            "Info: No cars have been added yet, please add cars in database."
          );
        }
      } else {
        alert("Error: Some error occured while fetching cars list.");
      }
    });
  };

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
          {storeData && storeData.length && storeData.length > 0 ? (
            storeData.map((carData, idx) => {
              return <ListCard data={carData} key={idx} />;
            })
          ) : (
            <div style={{ marginTop: "4rem" }}>
              <Loading />
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default CarList;

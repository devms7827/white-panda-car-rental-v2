import React, { Component, Fragment } from "react";
import Loading from "../Loading";
import { store } from "../../index";
import { Row, Col, Button, Badge, Table } from "reactstrap";
import Footer from "../Footer";
import { withRouter, Link } from "react-router-dom";

class PreviewDetails extends Component {
  state = {
    data: {},
  };

  componentDidMount() {
    // console.log("PreviewDetails > componentDidMount > props = ", this.props);
    const { id } = this.props.match.params;
    const storeData = store.getState();
    const data = storeData.carList.find((car) => car.id == id);
    this.setState({
      data,
    });
  }

  render() {
    const { data } = this.state;
    return (
      <Fragment>
        {data && !data.id && <Loading />}

        {data && data.id && data.id != "" && (
          <Fragment>
            <div className="container custom-container">
              <Button
                color="link"
                className="text-decoration-none mt-3 pl-0"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "black",
                }}
                onClick={(e) => this.props.history.goBack()}
              >
                <i class="fas fa-angle-left mr-2"></i>
                Go Back
              </Button>
            </div>
            <Details data={data} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withRouter(PreviewDetails);

const Details = (data) => {
  let car = data.data;
  return (
    <div className="container custom-container">
      <div className="preview-body">
        <Row className="card-wrapper">
          <Col sm={12} md={7} className="p-0">
            <img
              src={car.imgSrc}
              className="img-fluid card-img card-img__preview"
              alt={car.name}
              title={car.name}
            />
          </Col>
          <Col sm={12} md={5} className="my-auto preview-details">
            <Row>
              <Col sm={12} className="px-md-0 px-sm-0 mt-sm-4">
                <div className="preview-title">{car.name}</div>
              </Col>
              <Col sm={12} className="px-0">
                <div className="preview-features">
                  <span>
                    <i class="fas fa-eye-dropper mr-1"></i> {car.color}
                  </span>
                  <span style={{ position: "absolute", left: "8rem" }}>
                    <i class="fas fa-male mr-1"></i> {car.seater} seater
                  </span>
                </div>
              </Col>
              <Col sm={12} className="px-0">
                <div className="preview-features__price">
                  <span className="price-label">Rent per day: </span>
                  <span className="price-value">₹ {car.rentPerDay}</span>
                </div>
              </Col>
              <Col sm={12} className="px-0 mb-sm-4 custom-preview__button">
                <Link
                  to={`/book/${car.id}`}
                  className={`btn btn-secondary custom-button ${
                    car.available == false ? "disabled" : ""
                  }`}
                >
                  Book Now
                </Link>

                {car.available == false && (
                  <span className="preview-btn__unavailable">
                    Currently unavailable!
                  </span>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="preview-details__heading">Car Details</div>
        <hr className="preview-details__hr" />
        <div className="mt-4">{AvailableBadge(car.available)}</div>
        <div style={{ fontSize: "0.9rem" }}>
          <div className="mt-3">
            Vehicle Number: <span className="ml-2">{car.vehicleNumber}</span>
          </div>
          <div className="mt-3">
            Type: <span className="ml-2 text-capitalize">{car.carType}</span>
          </div>
          <div className="mt-3">
            Engine: <span className="ml-2 text-capitalize">{car.engine}</span>
          </div>
          <div className="mt-3">
            <p>{car.description}</p>
          </div>
        </div>
        {car.available == false ? (
          <Fragment>
            <div className="preview-details__heading">Current Booking</div>
            <hr className="preview-details__hr" />
            <Table borderless hover responsive className="table-custom">
              <thead style={{ fontWeight: "normal" }}>
                <tr className="text-uppercase">
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Issue Date</th>
                  <th>Return Date</th>
                </tr>
              </thead>
              <tbody className="text-capitalize" style={{ color: "black" }}>
                <tr>
                  <td>{car.currentBooking.name}</td>
                  <td>+{car.currentBooking.mobile}</td>
                  <td>{car.currentBooking.issueDate}</td>
                  <td>{car.currentBooking.returnDate}</td>
                </tr>
              </tbody>
            </Table>
          </Fragment>
        ) : (
          <div style={{ marginBottom: "4rem" }}></div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const AvailableBadge = (available) => {
  return (
    <Badge
      color={available ? "success" : "secondary"}
      className="px-2 py-2 br-1"
      style={{ borderRadius: "2px" }}
    >
      {available ? "Available" : "Not Available"}
      <i
        className={`${available ? "fas fa-check" : "fas fa-times"} ml-2 mr-0`}
        style={{ fontSize: "0.8rem" }}
      ></i>
    </Badge>
  );
};

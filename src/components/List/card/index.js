import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { withRouter } from "react-router-dom";

class ListCard extends Component {
  state = {
    data: {},
  };

  nextPage(path) {
    this.props.history.push(path);
  }

  componentDidMount() {
    this.setState({
      data: this.props.data,
    });
  }

  render() {
    const { data } = this.state;
    return (
      <Row className="card-wrapper">
        <Col xs={12} sm={6} md={6} lg={3} className="p-0">
          <img
            src={data.imgSrc}
            className="img-fluid card-img"
            alt={data.name}
            title={data.name}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6} className="my-auto card-details">
          <Row>
            <Col lg={8}>
              <div className="card-title mb-md-4 mb-sm-3">{data.name}</div>
              <div className="card-features">
                <span>
                  <i className="fas fa-eye-dropper mr-1"></i> {data.color}
                </span>
                <span className="card-features__seats">
                  <i className="fas fa-male mr-1"></i> {data.seater} seater
                </span>
              </div>
            </Col>
            <Col lg={4} className="my-auto mt-md-4 mt-sm-3">
              <span>₹ {data.rentPerDay}</span>
            </Col>
          </Row>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={12}
          lg={3}
          className="my-auto p-0 d-flex justify-content-around"
        >
          <Button
            color="secondary"
            size="md"
            className="custom-button"
            disabled={data.available ? false : true}
            onClick={() => this.nextPage(`/book/${data.id}`)}
          >
            Book Now
          </Button>
          <Button
            color="light"
            size="md"
            className="custom-button"
            onClick={() => this.nextPage(`/details/${data.id}`)}
          >
            Details
          </Button>
          {data.available == false && (
            <div className="btn-unavailable">Currently unavailable!</div>
          )}
        </Col>
      </Row>
    );
  }
}

export default withRouter(ListCard);

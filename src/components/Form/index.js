import React, { Component, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import moment from "moment";
import CustomModal from "../Modal";
import { store } from "../../index";
import * as actions from "../../store/cars";

class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      mobile: "",
      issueDate: "",
      returnDate: "",
      errors: {
        nameError: "",
        mobileError: "",
        issueDateError: "",
        returnDateError: "",
      },
      showModal: false,
      modalStatus: "",
      modalMsg: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // const storeData = store.getState();
    const { id } = this.props.match.params;
    this.setState({
      id,
    });
  }

  handleChange(event) {
    // console.log("BookingForm -> handleChange -> event", event.target.name);
    const type = event.target.name;
    const value = event.target.value;
    let obj = {};
    switch (type) {
      case "name":
        obj = {
          name: value,
        };
        break;
      case "mobile":
        obj = {
          mobile: value,
        };
        break;
      case "issueDate":
        obj = {
          issueDate: value,
        };
        break;
      case "returnDate":
        obj = {
          returnDate: value,
        };
        break;
      default:
        obj = {};
    }
    this.setState(obj);
  }

  mobileValidate(mobile) {
    //91 <10 digit>, indian mobile number validation
    const regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/gm;
    if (regex.test(mobile)) {
      return true;
    } else {
      return false;
    }
  }

  validateFormFields() {
    let result = true;
    let { name, mobile, issueDate, returnDate } = this.state;

    // name validation: checking length of name > 0
    if (name.length < 1) {
      this.setState({
        errors: {
          nameError: "Name should not be empty!",
        },
      });
      result = false;
    } else {
      //mobile number validation: indian numbers with +91 only
      let mobileValidationResult = this.mobileValidate(mobile);
      if (mobileValidationResult === false) {
        this.setState({
          errors: {
            mobileError: "Enter valid 91<10 digit> mobile number!",
          },
        });
        result = false;
      } else {
        //validating if +91 is added or not
        if (mobile.indexOf("91") !== 0) {
          this.setState({
            errors: {
              mobileError: "Add 91 with mobile number!",
            },
          });
          result = false;
        } else {
          //validation for issueDate
          if (issueDate.length < 1) {
            this.setState({
              errors: {
                issueDateError: "Please select issue date!",
              },
            });
            result = false;
          } else {
            //validation for returnDate
            if (returnDate.length < 1) {
              this.setState({
                errors: {
                  returnDateError: "Please select return date!",
                },
              });
              result = false;
            } else {
              //checking if issueDate is earlier than return date
              if (issueDate > returnDate) {
                this.setState({
                  errors: {
                    returnDateError:
                      "Return date should not be before issue date!",
                  },
                });
                result = false;
              }
            }
          }
        }
      }
    }

    //final result check
    if (result) {
      //if result is true remove all errors
      this.setState({
        errors: {
          nameError: "",
          mobileError: "",
          issueDateError: "",
          returnDateError: "",
        },
      });
    }

    return result;
  }

  handleSubmit(event) {
    event.preventDefault();

    // initiating formValidation
    if (this.validateFormFields()) {
      // console.log("Form validation successful.");

      let { id, name, mobile, issueDate, returnDate } = this.state;

      //modifying dates after successful validation
      issueDate = moment(issueDate, "YYYY-MM-DD").format("Do MMM, YYYY");
      returnDate = moment(returnDate, "YYYY-MM-DD").format("Do MMM, YYYY");

      //dispatching data to store only when car is not booked already
      const storeData = store.getState();
      const index = storeData.carList.findIndex((car) => car.id == id);

      if (index >= 0) {
        //it means we have this car
        if (storeData["carList"][index].available === true) {
          let carName = storeData["carList"][index].name;

          //now calling displatch as car exists and is also available
          store.dispatch(
            actions.carBooked({
              id,
              name,
              mobile,
              issueDate,
              returnDate,
            })
          );
          // console.log("store after dispatch = ", store.getState());

          //showing confirmed booking popup message
          this.setState({
            showModal: true,
            modalStatus: "confirmed",
            modalMsg: { name: carName, issueDate, returnDate },
          });
        } else {
          //showing error msg as car exists but its not available
          // console.log("showing error msg as car exists but its not available");
          this.setState({
            showModal: true,
            modalStatus: "error",
            modalMsg: "Sorry, car is not available!",
          });
        }
      } else {
        //it means we do not have this car! so show error msg!
        // console.log("we do not have this car! so show error msg!");
        this.setState({
          showModal: true,
          modalStatus: "error",
          modalMsg: "Sorry, no car details found!",
        });
      }
    }
  }

  render() {
    const {
      name,
      mobile,
      issueDate,
      returnDate,
      errors,
      showModal,
      modalStatus,
      modalMsg,
    } = this.state;

    return (
      <Fragment>
        <Container className="form-body">
          <Row style={{ backgroundColor: "#f5f5f5" }}>
            <Col md={0} lg={3} className="p-0">
              <img
                src="https://pixabay.com/get/52e5d1414e5bb108f5d08460da2932761d3cd7e05b5075_1280.jpg"
                className="img-fluid card-img form-img"
                alt="Book a car now!"
                title="Book a car now!"
              />
            </Col>
            <Col md={12} lg={9} className="my-auto form-details">
              <Row>
                <Col sm={12}>
                  <div className="form-title">Booking details</div>
                </Col>
                <Col sm={12}>
                  <Form onSubmit={this.handleSubmit}>
                    <Row form>
                      <Col sm={12} md={6}>
                        <FormGroup>
                          <Label for="name">Name</Label>
                          <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Full name"
                            value={name}
                            onChange={this.handleChange}
                          />
                          {errors &&
                            errors.nameError &&
                            errors.nameError !== "" && (
                              <div className="form-validation__error">
                                {errors.nameError}
                              </div>
                            )}
                        </FormGroup>
                      </Col>
                      <Col sm={12} md={6}>
                        <FormGroup>
                          <Label for="mobile">Contact number</Label>
                          <Input
                            type="number"
                            name="mobile"
                            id="mobile"
                            placeholder="+91"
                            value={mobile}
                            onChange={this.handleChange}
                          />
                          {errors &&
                            errors.mobileError &&
                            errors.mobileError !== "" && (
                              <div className="form-validation__error">
                                {errors.mobileError}
                              </div>
                            )}
                        </FormGroup>
                      </Col>
                      <Col sm={12} md={6}>
                        <FormGroup>
                          <Label for="issueDate">Issue Date</Label>
                          <Input
                            type="date"
                            name="issueDate"
                            id="issueDate"
                            value={issueDate}
                            onChange={this.handleChange}
                          />
                          {errors &&
                            errors.issueDateError &&
                            errors.issueDateError !== "" && (
                              <div className="form-validation__error">
                                {errors.issueDateError}
                              </div>
                            )}
                        </FormGroup>
                      </Col>
                      <Col sm={12} md={6}>
                        <FormGroup>
                          <Label for="returnDate">Return Date</Label>
                          <Input
                            type="date"
                            name="returnDate"
                            id="returnDate"
                            value={returnDate}
                            onChange={this.handleChange}
                          />
                          {errors &&
                            errors.returnDateError &&
                            errors.returnDateError !== "" && (
                              <div className="form-validation__error">
                                {errors.returnDateError}
                              </div>
                            )}
                        </FormGroup>
                      </Col>
                      <Col
                        sm={12}
                        className="mt-5 d-flex justify-content-between"
                      >
                        <Button
                          color="link"
                          className="text-decoration-none"
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: "500",
                            color: "black",
                          }}
                          onClick={(e) => this.props.history.goBack()}
                        >
                          <i className="fas fa-angle-left mr-2"></i>
                          Back
                        </Button>
                        <Button
                          color="secondary"
                          className="custom-button px-4"
                          type="submit"
                        >
                          Book car
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
          {showModal && (
            <CustomModal
              status={modalStatus}
              msg={modalMsg}
              showModal={showModal}
            />
          )}
        </Container>
      </Fragment>
    );
  }
}

export default BookingForm;

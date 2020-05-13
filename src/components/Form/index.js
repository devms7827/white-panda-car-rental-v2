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
import Loading from "../Loading";
import axios from "axios";
import serverLink from "../../serverLink";

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
      formLoading: false,
      buttonText: "book car",
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
    this.getBookingDetails(id);
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

  saveBookingDetails = (details) => {
    // Setting the formLoading to true to indicate form is being saved in backend
    this.setState({
      formLoading: true,
    });

    // Call the backend api for saving/updating these details in the database
    axios
      .patch(`${serverLink}/book/${this.state.id}`, details)
      .then((result) => {
        const { data } = result;
        if (data && data.status && data.status == 1) {
          //showing confirmed booking popup message
          this.setState({
            showModal: true,
            modalStatus: "confirmed",
            modalMsg: {
              name: details.name,
              issueDate: details.issueDate,
              returnDate: details.returnDate,
            },
          });
        } else {
          // alert("Error: Some error occured while saving car booking details.");
          this.setState({
            showModal: true,
            modalStatus: "error",
            modalMsg: data.message,
          });
        }
      });

    // Setting the formLoading to false to indicate form is done processing
    this.setState({
      formLoading: false,
    });
  };

  getBookingDetails = (id) => {
    // First get the car details of the current car being booked
    axios.get(`${serverLink}/details/${id}`).then((result) => {
      const { data } = result;
      if (data && data.status && data.status == 1) {
        const { payload } = data;
        // Now if the booking details are available for the car, convert them and setState the values for edit
        if (payload && payload._id && payload._id != "" && !payload.available) {
          this.setState({
            name: payload.currentBooking.name,
            mobile: payload.currentBooking.mobile.toString(),
            issueDate: moment(
              payload.currentBooking.issueDate,
              "Do MMM, YYYY"
            ).format("YYYY-MM-DD"),
            returnDate: moment(
              payload.currentBooking.returnDate,
              "Do MMM, YYYY"
            ).format("YYYY-MM-DD"),
            buttonText: "update booking",
          });
        }
        // this.setState({
        //   data: data.payload,
        // });
      } else {
        alert(
          "Error: Some error occured while fetching cars details for this car."
        );
      }
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    // initiating formValidation
    if (this.validateFormFields()) {
      // console.log("Form validation successful.");

      let { name, mobile, issueDate, returnDate } = this.state;

      //modifying dates after successful validation
      issueDate = moment(issueDate, "YYYY-MM-DD").format("Do MMM, YYYY");
      returnDate = moment(returnDate, "YYYY-MM-DD").format("Do MMM, YYYY");

      // Instead of the long commented code of redux, we will just call the service to save these booking details.
      this.saveBookingDetails({
        name,
        mobile,
        issueDate,
        returnDate,
      });

      // //dispatching data to store only when car is not booked already
      // const storeData = store.getState();
      // const index = storeData.carList.findIndex((car) => car.id == id);

      // if (index >= 0) {
      //   //it means we have this car
      //   if (storeData["carList"][index].available === true) {
      //     let carName = storeData["carList"][index].name;

      //     //now calling displatch as car exists and is also available
      //     store.dispatch(
      //       actions.carBooked({
      //         id,
      //         name,
      //         mobile,
      //         issueDate,
      //         returnDate,
      //       })
      //     );
      //     // console.log("store after dispatch = ", store.getState());

      //     //showing confirmed booking popup message
      //     this.setState({
      //       showModal: true,
      //       modalStatus: "confirmed",
      //       modalMsg: { name: carName, issueDate, returnDate },
      //     });
      //   } else {
      //     //showing error msg as car exists but its not available
      //     // console.log("showing error msg as car exists but its not available");
      //     this.setState({
      //       showModal: true,
      //       modalStatus: "error",
      //       modalMsg: "Sorry, car is not available!",
      //     });
      //   }
      // } else {
      //   //it means we do not have this car! so show error msg!
      //   // console.log("we do not have this car! so show error msg!");
      //   this.setState({
      //     showModal: true,
      //     modalStatus: "error",
      //     modalMsg: "Sorry, no car details found!",
      //   });
      // }
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
      formLoading,
      buttonText,
    } = this.state;

    return (
      <Fragment>
        <Container className="form-body">
          <Row style={{ backgroundColor: "#f5f5f5" }}>
            <Col md={0} lg={3} className="p-0">
              <img
                // src="https://wimg.jakpost.travel/wimages/sm/179-1798401_car-wash-fundraiser-idea-vintage-cars-wallpaper-portrait.jpg"
                src="https://www.techtapper.com/wp-content/uploads/2013/05/HD-Racing-cars-wallpapers-for-iPhone-5-26.jpg"
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
                          className="custom-button px-4 text-capitalize"
                          type="submit"
                        >
                          {buttonText}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
          {formLoading && <Loading />}
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

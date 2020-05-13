import React, { useState, useEffect, Fragment } from "react";
import { Modal, ModalBody, Row, Col } from "reactstrap";
import { withRouter, Link } from "react-router-dom";

const CustomModal = (props) => {
  const { status, msg, showModal } = props;
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    setModal(showModal);
  }, [showModal]);

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        backdrop="static"
        keyboard={false}
        className="custom-modal"
      >
        <ModalBody>
          <Row>
            <Col sm={4}>
              <div className="modal-icon">
                {status && status === "confirmed" ? (
                  <i className="far fa-check-circle booking-confimed__check"></i>
                ) : (
                  <i className="fas fa-exclamation-triangle booking-error__inform"></i>
                )}
              </div>
            </Col>
            <Col sm={8} className="my-auto p-2 py-3">
              <div className="modal-heading__msg">
                {status && status === "confirmed"
                  ? "booking confirmed!"
                  : "error"}
              </div>
              <div className="mb-3">
                {status && status === "confirmed" ? (
                  <Fragment>
                    <div>
                      <span className="booking-confimed__variable">
                        Booked for:
                      </span>
                      <span className="booking-confimed__value">
                        {msg && msg.name}
                      </span>
                    </div>
                    <div>
                      <span className="booking-confimed__variable">
                        Duration:
                      </span>
                      <span className="booking-confimed__value">
                        {msg && msg.issueDate} to {msg && msg.returnDate}
                      </span>
                    </div>
                  </Fragment>
                ) : (
                  <span>{msg}</span>
                )}
              </div>
              <div className="text-right pt-2" style={{ marginRight: "2rem" }}>
                {/* <Link to="/" className="modal-button__link">
                  {status && status === "confirmed" ? "Continue" : "OK"}
                </Link> */}
                <a
                  href="#"
                  className="modal-button__link"
                  onClick={(e) => {
                    window.history.back();
                  }}
                >
                  {status && status === "confirmed" ? "Continue" : "OK"}
                </a>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default withRouter(CustomModal);

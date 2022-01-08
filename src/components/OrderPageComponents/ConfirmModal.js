import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const ConfirmModal = ({ show, handleClose, actions, orderState }) => {
  const orderStates = ["ACCEPTED", "CANCELLED", "DELIVERED"];
  const [orderStateChoice, setOrderStateChoice] = useState(
    orderState === "PENDING" ? 0 : orderStates.indexOf(orderState)
  );
  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
      }}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>
          <Modal.Title>Choose the action to perform</Modal.Title>
        </h6>
        <select
          className="m-3 form-control"
          style={{ width: "30%" }}
          onChange={(e) => {
            e.preventDefault();
            setOrderStateChoice(e.target.value);
          }}
          value={orderStateChoice}
        >
          {orderStates.map((ele, index) => (
            <option id={index} value={index}>
              {ele}
            </option>
          ))}
        </select>
        <div className="row">
          <div
            className="btn btn-secondary col-4 offset-2 mr-3"
            onClick={handleClose}
          >
            No
          </div>
          <div
            className="btn btn-success col-4"
            onClick={() => {
              actions[orderStateChoice]();
              handleClose();
            }}
          >
            Yes
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;

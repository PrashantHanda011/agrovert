import React,{useState,useEffect} from "react";
import { Modal } from "react-bootstrap";
const CouponForm = ({show,handleClose,categories}) => {
  const createCouponForm = () => {
    return (
      <form>
        <div className="form-group">
          <span>
            <h6>Name</h6>
          </span>
          <input type="text" name="name" className="form-control form-control-user" />
        </div>
        <div className="form-group">
          <span>
            <h6>Discount</h6>
          </span>
          <input type="text" name="name" className="form-control form-control-user" />
        </div>
        <div className="form-group">
          <span>
            <h6>Category</h6>
          </span>
          <input type="text" name="name" className="form-control form-control-user" />
        </div>
        <div className="form-group">
          <span>
            <h6>Active?</h6>
          </span>
          <select name="is_active" className="form-control form-control-user" value={true}>
              <option key={1} value={true}>
                  Active
              </option>
              <option key={1} value={false}>
                  Not Active
              </option>
          </select>
        </div>
      </form>
    );
  };
  return <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Add a Coupon</Modal.Title>
  </Modal.Header>
  <Modal.Body>{createCouponForm()}</Modal.Body>
  <Modal.Footer>
    <button className="btn btn-secondary" onClick={handleClose}>
      Close
    </button>
    <button
      type="submit"
      onClick={()=>{}}
      className="btn btn-success my-3 mb-3">
      Create Coupon
    </button>
  </Modal.Footer>
</Modal>;
};

export default CouponForm;

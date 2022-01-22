import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import CouponModule from "../../modules/couponModule";
const CouponForm = ({ show, handleClose, categories, addCouponToState }) => {
  const couponModule = new CouponModule();
  const [values, setValues] = useState({
    name: "",
    discount: 0,
    isActive: true,
    category: Object.keys(categories)[0],
    error: {
      isThere: false,
      name: false,
      discount: false,
    },
  });
  const changeHandler = (name) => (event) => {
    let value = event.target.value;

    setValues({ ...values, [name]: value });
  };

  const checkMissing = () => {
    let errors = {};
    if (name === "") {
      error["isthere"] = true;
      errors["name"] = true;
    }
    if (discount === 0) {
      error["isThere"] = true;
      errors["discount"] = true;
    }

    setValues({
      ...values,
      error: errors,
    });
  };
  const { name, discount, isActive, category, error } = values;

  const onSubmit = async (event) => {
    event.preventDefault();
    checkMissing();
    if (error.isthere === true) {
      return;
    } else {
      const newCoupon = {
        name,
        discount,
        category_id: category,
        category_name: categories[category],
        is_active: isActive,
      };
      await couponModule.createCoupon(newCoupon, addCouponToState, handleClose);
    }
  };
  const createCouponForm = () => {
    return (
      <form>
        <div className="form-group">
          <span>
            <h6>Name</h6>
          </span>
          <input
            type="text"
            name="name"
            className="form-control form-control-user"
            value={name}
            onChange={changeHandler("name")}
          />
          {!name && error.name === true && (
            <div className="text-danger text-sm">Please add name</div>
          )}
        </div>
        <div className="form-group">
          <span>
            <h6>Discount</h6>
          </span>
          <input
            type="number"
            name="discount"
            className="form-control form-control-user"
            value={discount}
            onChange={changeHandler("discount")}
          />
          {discount === 0 && error.discount === true && (
            <div className="text-danger text-sm">Discount can't be 0</div>
          )}
        </div>
        <div className="form-group">
          <span>
            <h6>Category</h6>
            <select
              name="category"
              value={category}
              className="form-control form-control-user"
              onChange={changeHandler("category")}
            >
              {Object.keys(categories).map((cate, index) => (
                <option id={index} value={cate}>
                  {categories[cate]}
                </option>
              ))}
            </select>
          </span>
        </div>
        <div className="form-group">
          <span>
            <h6>Active?</h6>
          </span>
          <select
            name="isActive"
            className="form-control form-control-user"
            value={isActive}
            onChange={changeHandler("isActive")}
          >
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
  return (
    <Modal show={show} onHide={handleClose}>
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
          onClick={onSubmit}
          className="btn btn-success my-3 mb-3"
        >
          Create Coupon
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CouponForm;

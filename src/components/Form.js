import React, { useState, useEffect } from "react";
import { auth, storage } from "../Firebase";
import { uploadData } from "../utils";
import Base from "./Base";
import { Modal } from "react-bootstrap";
import Loading from "./Loading";

const Form = () => {
  console.log(auth.currentUser)
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    margin: "",
    slabs: [],
    weight: "",
    image_url: "",
    photo: "",
    slab1: "",
    slab2: "",
    error: {
      isthere: false,
      name: false,
      description: false,
      quantity: false,
      price: false,
      margin: false,
      weight: false,
      photo: false,
      slab1: false,
      slab2: false,
    },
  });
  const [show, setShow] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const {
    name,
    description,
    price,
    quantity,
    margin,
    slabs,
    weight,
    image_url,
    photo,
    slab1,
    slab2,
    error,
  } = values;

  const changeHandler = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    setValues({ ...values, [name]: value });
  };

  const checkMissing = () => {
    if (photo === "") {
      return "photo";
    }
    if (name === "") {
      return "name";
    }
    if (price === "") {
      return "price";
    }
    if (name === "") {
      return "name";
    }
    if (quantity === "") {
      return "quantity";
    }
    if (margin === "") {
      return "margin";
    }
    if (weight === "") {
      return "weight";
    }
    if (slab1 === "") {
      return "slab1";
    }
    if (slab2 === "") {
      return "slab2";
    }
    if (description === "") {
      return "description";
    }
  };

  const handleSpinner = () => setShowLoading(false);
  const handlShowSpinner = () => setShowLoading(true);

  const onSubmit = async (event) => {
    event.preventDefault();
    handlShowSpinner()
    if (checkMissing()) {
      console.log("this section");
      setValues({ ...values, error: checkMissing() });
    } else {
      const product = {
        name,
        description,
        quantity,
        price,
        slabs: [{ slab1: slab1 }, { slab2: slab2 }],
        image_url: "",
        weight,
        margin,
      };
      uploadData(photo, product, values, setValues);
      handleSpinner()
      handleClose()
      return;
    }
  };

  const createProductForm = () => (
    <form>
      <span>
        <h6>Upload Photo</h6>
      </span>
      <div className="form-group my-3">
        <label className="w-100">
          <img
            src={image_url}
            alt=""
            style={{
              width: image_url ? "120px" : "0",
              height: image_url ? "100px" : "0",
            }}
          />
          <br />
          <input
            onChange={changeHandler("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
          {!photo && error === "photo" && (
            <div className="text-danger text-sm">Please upload a photo</div>
          )}
        </label>
      </div>
      <span>
        <h6>Name</h6>
      </span>
      <div className="form-group my-3">
        <input
          type="text"
          name="name"
          className="form-control"
          value={name}
          placeholder="Name"
          onChange={changeHandler("name")}
        />
        {!name && error === "name" && (
          <div className="text-danger text-sm">Please add name</div>
        )}
      </div>

      <span>
        <h6>Description</h6>
      </span>
      <div className="form-group my-3">
        <textarea
          name="description"
          className="form-control"
          value={description}
          placeholder="Description ..."
          onChange={changeHandler("description")}
        />
        {!description && error === "description" && (
          <div className="text-danger text-sm">Please add description</div>
        )}
      </div>
      <span>
        <h6>Quantity</h6>
      </span>
      <div className="form-group my-3">
        <input
          type="text"
          name="quantity"
          className="form-control"
          value={quantity}
          placeholder="Quantity"
          onChange={changeHandler("quantity")}
        />
        {!quantity && error === "quantity" && (
          <div className="text-danger text-sm">Please add quantity</div>
        )}
      </div>
      <span>
        <h6>MRP</h6>
      </span>
      <div className="form-group my-3">
        <input
          type="number"
          name="price"
          step={0.01}
          className="form-control"
          value={price}
          placeholder="MRP"
          onChange={changeHandler("price")}
        />
        {!price && error === "price" && (
          <div className="text-danger text-sm">Please add MRP</div>
        )}
      </div>
      <span>
        <h6>Margin</h6>
      </span>
      <div className="form-group my-3">
        <input
          type="number"
          name="margin"
          step={0.01}
          className="form-control"
          value={margin}
          placeholder="Margin (only numeric)"
          onChange={changeHandler("margin")}
        />
        {!margin && error === "margin" && (
          <div className="text-danger text-sm">Please add margin</div>
        )}
      </div>
      <span>
        <h6>Weight</h6>
      </span>
      <div className="form-group my-3">
        <input
          type="number"
          name="weight"
          className="form-control"
          value={weight}
          placeholder="Weight (gm)"
          onChange={changeHandler("weight")}
        />
        {!weight && error === "weight" && (
          <div className="text-danger text-sm">Please add weight</div>
        )}
      </div>
      <span>
        <h6>Slabs</h6>
      </span>
      <div className="form-group my-3">
        <label>Slab 1</label>
        <input
          type="number"
          name="slab1"
          step={0.01}
          className="form-control"
          value={slab1}
          placeholder="Slab1 Price"
          onChange={changeHandler("slab1")}
        />
        {!slab1 && error === "slab1" && (
          <div className="text-danger text-sm mb-3">
            Please add slab1 amount
          </div>
        )}
        <label>Slab 2</label>
        <input
          type="number"
          name="slab2"
          step={0.01}
          className="form-control"
          value={slab2}
          placeholder="Slab2 Price"
          onChange={changeHandler("slab2")}
        />
        {!slab2 && error === "slab2" && (
          <div className="text-danger text-sm mb-3">
            Please add slab2 amount
          </div>
        )}
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-success my-3 mb-3">
        Create Product
      </button>
    </form>
  );

  const handleClose = () => setShow(false);
  const handlShow = () => setShow(true);
  

  const modal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>{createProductForm()}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleClose}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Base>
      <button className="btn btn-primary ml-2" onClick={handlShow}>
        Add Product
      </button>
      {showLoading && <Loading/>}
      {modal()}
    </Base>
  );
};

export default Form;

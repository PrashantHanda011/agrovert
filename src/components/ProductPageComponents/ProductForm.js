import React, { useState, useEffect } from "react";
import { uploadProduct,updateProductWithId} from "../../utils/utils";
import { Modal } from "react-bootstrap";
import Loading from "../Base/Loading";
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import { storage } from "../../Firebase";

const ProductForm = ({ show, handleClose, product={}, categories }) => {
  const {appState,addProduct,updateProductWithGivenId} = useContext(AppContext)

  const [values, setValues] = useState({
    name: product.name?product.name:"",
    description: product.description?product.description:"",
    price: product.price?product.price:"",
    quantity: product.quantity?product.quantity:"",
    margin: product.margin?product.margin:"",
    weight: product.weight?product.weight:"",
    image_url: product.image_url?product.image_url:"",
    photo: "",
    offered_price: product.offered_price?product.offered_price:"",
    category_id: product.category_id?product.category_id:"",
    error: {
      isthere: false,
      name: false,
      description: false,
      quantity: false,
      price: false,
      margin: false,
      weight: false,
      photo: false,
      offered_price: false,
    },
  });
  const [close,setClose] = useState(false)

  const {
    name,
    description,
    price,
    quantity,
    margin,
    weight,
    image_url,
    photo,
    offered_price,
    error,
    category_id,

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
    if (offered_price === "") {
      return "offered_price";
    }
    
    if (description === "") {
      return "description";
    }
  };

  useEffect(()=>{
    if(close===true){
      handleClose()
    }
  },[close])

  const onSubmit = async (event) => {
    event.preventDefault();
    if(Object.keys(product).length===0){
      if (checkMissing()) {
        setValues({ ...values, error: checkMissing() });
      } else {
        const newProduct = {
          name,
          description,
          quantity,
          price,
          offered_price,
          image_url: "",
          file_name:photo.name,
          weight,
          margin,
          category_id,
        };
        await uploadProduct(photo, newProduct,addProduct,setClose);
        
        return;
    }}
    else{
      const updatedProduct = {
        name,
        description,
        quantity,
        price,
        offered_price,
        image_url: image_url,
        weight,
        margin,
        category_id,
      };
      await updateProductWithId(product.id,photo, updatedProduct,updateProductWithGivenId,setClose);
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
            className="form-control form-control-user"
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
          className="form-control form-control-user"
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
          className="form-control form-control-user"
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
          type="number"
          name="quantity"
          className="form-control form-control-user"
          value={quantity}
          placeholder="Quantity"
          onChange={changeHandler("quantity")}
        />
        {!quantity && error === "quantity" && (
          <div className="text-danger text-sm">Please add quantity</div>
        )}
      </div>
      <span>Category</span>
      <div className="form-group my-3">
        <select
          onChange={changeHandler("category_id")}
          className="form-control"
          placeholder="Category" value={category_id}>
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option id={index} value={cate.id}>
                {cate.category_name}
              </option>
            ))}
        </select>
      </div>
      <span>
        <h6>MRP</h6>
      </span>
      <div className="form-group my-3">
        <input
          type="number"
          name="price"
          step={0.01}
          className="form-control form-control-user"
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
          className="form-control form-control-user"
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
          className="form-control form-control-user"
          value={weight}
          placeholder="Weight (gm)"
          onChange={changeHandler("weight")}
        />
        {!weight && error === "weight" && (
          <div className="text-danger text-sm">Please add weight</div>
        )}
      </div>
      <span>
        <h6>Offered Price</h6>
      </span>
      <div className="form-group my-3">
        <input
          type="number"
          name="slab1"
          step={0.01}
          className="form-control form-control-user"
          value={offered_price}
          placeholder="Offered Price"
          onChange={changeHandler("offered_price")}
        />
        {!offered_price && error === "offered_price" && (
          <div className="text-danger text-sm mb-3">
            Please add offered price
          </div>
        )}
      </div>
    </form>
  );

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
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-success my-3 mb-3">
          {Object.keys(product).length>0? "Update Product":"Add Product"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductForm;

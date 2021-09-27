import React, { useState, useEffect } from "react";
import ProductModule from "../../modules/productModule.js";
import { Modal } from "react-bootstrap";
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import { firestore } from "../../Firebase.js";


const ProductForm = ({ show, handleClose, product={}, categories,updateProduct,addNewProduct }) => {
  const {appState,addProduct,updateProductWithGivenId} = useContext(AppContext)
  const productModule = new ProductModule();

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
    let value = name === "photo" ? event.target.files[0] : name==="in_stock"?event.target.value==="on"?true:false:event.target.value;

    setValues({ ...values, [name]: value });
  };

  const checkMissing = () => {
    const errors= {}
    if (photo === "") {
      error["isthere"]=true;
      errors["photo"] = true
    }
    if (name === "") {error["isthere"]=true;
      errors["name"] = true
    }
    if (price === "") {error["isthere"]=true;
     errors["price"] = true
    }
    
    if (quantity === "") {error["isthere"]=true;
      errors["quantity"] = true
    }
    if (margin === "") {error["isthere"]=true;
     errors["margin"] = true
    }
    if (weight === "") {error["isthere"]=true;
     errors["weight"] = true
    }
    if (offered_price === "") {error["isthere"]=true;
      errors["offered_price"]=true;
    }

    if (description === "") {error["isthere"]=true;
      errors["description"]=true
    }
    if(category_id===""){error["isthere"]=true;errors["category_id"]=true}

   setValues({
     ...values,
     error:errors
   })
  };

  useEffect(()=>{
    if(close===true){
      handleClose()
    }
  },[close])

  const onSubmit = async (event) => {
    event.preventDefault();
    if(Object.keys(product).length===0){
       checkMissing()
        if(error.isthere===true){
          return
        }else{
          const productsInCategory = await firestore.collection('products').where("category_id","==",category_id).get()
          const rankNew = productsInCategory.docs.length+1
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
            rank:rankNew,
            in_stock:true
          };
          await productModule.uploadProduct(photo, newProduct,addNewProduct,setClose);
          
          return;
        }
    }
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
        rank:product.rank,
        in_stock:product.in_stock
      };
      updateProduct(product.id,updatedProduct)
      await productModule.updateProduct(product.id,photo, updatedProduct,updateProductWithGivenId,setClose);
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
          {!photo && error.photo === true && (
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
        {!name && error.name === true && (
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
        {!description && error.description===true && (
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
        {!quantity && error.quantity===true && (
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
        {!category_id && error.category_id===true && (
          <div className="text-danger text-sm">Please add category</div>
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
          className="form-control form-control-user"
          value={price}
          placeholder="MRP"
          onChange={changeHandler("price")}
        />
        {!price && error.price===true && (
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
        {!margin && error.margin===true && (
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
        {!weight && error.weight===true && (
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
        {!offered_price && error.offered_price===true && (
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

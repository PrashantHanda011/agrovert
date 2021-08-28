import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { uploadCategory,updateCategory } from "../../utils/utils";
import { AppContext } from "../../context/Context";
import { useContext } from "react";

const CategoryForm = ({ show, handleClose, category_={} }) => {
  const [category, setCategory] = useState(!category_.category_name?"":category_.category_name);
  const [file, setFile] = useState("");
  const [error, setError] = useState({ image: false, category_name: false });
  const [close, setClose] = useState(false);
  const [imageUrl, setImageUrl] = useState(!category_.image_url?"":category_.image_url);
  const { appState, addCategory,updateCategoryWithId } = useContext(AppContext);

  
  const handleInput = (e) => {
    setCategory(e.target.value);
  };

  const handleImage = (event) => {
    const value = event.target.files[0];
    setFile(value);
  };

  const checkMissing = () => {
    if (file === "") {
      setError({ ...error, image: true });
    }
    if (category === "") {
      setError({ ...error, category_name: true });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(category_).length < 1) {
      checkMissing();
      if (!(error.image && error.category_name)) {
        uploadCategory(file, category, addCategory, setClose);
      } else {
        return;
      }
    }else{
      if(file){
        const newCategory = {category_name:category,image_url:imageUrl}
        updateCategory(category_.id,file,newCategory,updateCategoryWithId,setClose)
      }
      else{
        const newCategory = {category_name:category,image_url:imageUrl}
        updateCategory(category_.id,file,newCategory,updateCategoryWithId,setClose)
      }
    }
  };

  useEffect(() => {
    if (close === true) {
      handleClose();
    }
  }, [close]);

  const createCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <span>
            <h6>Upload Image</h6>
          </span>
          <input
            type="file"
            name="image"
            className="form-control form-control-user"
            onChange={handleImage}
          />
          {error.image && (
            <div className="text-danger text-sm">Please upload a photo</div>
          )}
        </div>
        <div className="form-group">
          <span>
            <h6>Category</h6>
          </span>
          <input
            type="text"
            name="category"
            className="form-control form-control-user"
            value={category}
            onChange={handleInput}
          />
          {error.category_name && (
            <div className="text-danger text-sm">Please add category name</div>
          )}
        </div>
      </form>
    );
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>{createCategoryForm()}</Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Close
        </button>
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-success my-3 mb-3">
          {Object.keys(category_).length>1?"Update Category":"Create Category"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryForm;

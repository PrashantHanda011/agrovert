import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import CategoryModule from '../../modules/categoryModule'
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import { firestore } from "../../Firebase";

const CategoryForm = ({ show, handleClose, category_={},addNewCategory,updateCategory }) => {
  const [category, setCategory] = useState(!category_.category_name?"":category_.category_name);
  const [file, setFile] = useState("");
  const [error, setError] = useState({ image: false, category_name: false });
  const [close, setClose] = useState(false);
  const [imageUrl, setImageUrl] = useState(!category_.image_url?"":category_.image_url);
  const { appState, addCategory,updateCategoryWithId } = useContext(AppContext);
  const categoryModule = new CategoryModule()
  
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
  const onSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(category_).length < 1) {
      checkMissing();
      if (!(error.image && error.category_name)) {
        const categoryRankPromise = await firestore.collection('categories').get()
        const rankNew = categoryRankPromise.docs.length+1
        categoryModule.uploadCategory(file, category, rankNew ,addNewCategory, setClose);
      } else {
        return;
      }
    }else{
      if(file){
        const newCategory = {category_name:category,image_url:imageUrl,rank:category_.rank}
        categoryModule.updateCategory(category_.id,file,newCategory,updateCategory,setClose)
      }
      else{
        const newCategory = {category_name:category,image_url:imageUrl,rank:category_.rank}
        categoryModule.updateCategory(category_.id,file,newCategory,updateCategory,setClose)
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

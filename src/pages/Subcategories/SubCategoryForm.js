import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import SubCategoryModule from "../../modules/subCategoryModule";

const SubCategoryForm = ({
  showModal,
  closeModal,
  categoryId,
  categoryName,
  setSubCategories,
  subCategories,
  update,
  currentSubCategoryName=null,
  subCategoryId=null
}) => {
  const [name, setName] = useState(!currentSubCategoryName?"":currentSubCategoryName);
  const [error, setError] = useState(false);
  const changeNameValue = (e) => {
    setName(e.target.value);
  };
  const showError = () => {
    setError(true);
  };
  const subCategoryModule = new SubCategoryModule()

  const onSubmit = async (e) => {
      e.preventDefault()
      if(name===''){
          showError()
          return 
     }
     if(!update){
        await subCategoryModule.addSubCategory({name,category_id: categoryId,category_name: categoryName},subCategories,setSubCategories)
        closeModal()
     }else{
         await subCategoryModule.updateSubCategory(subCategoryId,{name,categoru_id:categoryId,category_name:categoryName})
         const newSubCategories = subCategories.map(subCategory=>{
             if(subCategory.id===subCategoryId){
                 subCategory.name= name
             }
             return subCategory
         })
         setSubCategories(newSubCategories)
         closeModal()
     }
     
  }
  const makeUI = () => {
    return (
      <form>
        <div className="form-group">
          <span>
            <h6>Sub Category</h6>
          </span>
          <input
            type="text"
            name="category"
            className="form-control form-control-user"
            value={name}
            onChange={changeNameValue}
          />
          {error && (
            <div className="text-danger text-sm">
              Please add sub category name
            </div>
          )}
        </div>
      </form>
    );
  };
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Sub Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>{makeUI()}</Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={closeModal}>
          Close
        </button>
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-success my-3 mb-3"
        >
          {update?"Update Category":"Create Category"}
          
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubCategoryForm;

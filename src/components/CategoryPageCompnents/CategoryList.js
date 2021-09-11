import React, { useState, useEffect } from "react";
import Loading from "../Base/Loading";
import AddButton from "./AddButton";
import CategoryForm from "./CategoryForm";
import CategoryTile from "./CategoryTile";

const CategoryList = ({ categories }) => {
  const [handleCategoryForm,setHandleCategoryForm] = useState({show:0,category:null})
  const openForm = () => {
    setHandleCategoryForm({...handleCategoryForm,show:1});
  };

  const openUpdateForm = (category) => {
    setHandleCategoryForm({...handleCategoryForm,show:2,category:category});
  };

  const closeForm = () => {
    setHandleCategoryForm({...handleCategoryForm,show:0});
  };

  const makeUI = () => {
    return (
      <>
        <AddButton
          className="mb-5"
          name="Add Cagtegory"
          handleShowProduct={openForm}
        />
        <div className="row mt-5 mx-3">
          {categories.map((category,index) => {
            return (
              <div className="col-lg-4 col-md-12 my-2">
                <CategoryTile
                  id={category.id}
                  index={index}
                  category_name={category.category_name}
                  image_url={category.image_url}
                  handleShowCategory={()=>{openUpdateForm(category)}}
                  className="mt-3"
                />{" "}
              </div>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div>
      {categories ? makeUI() : <Loading />}
      {handleCategoryForm.show=== 1 ? (
        <CategoryForm
          show={handleCategoryForm.show}
          handleClose={closeForm}
        />
      ) : (
        <></>
      )}
      {handleCategoryForm.show === 2 ? (
        <CategoryForm
          show={handleCategoryForm.show}
          handleClose={closeForm}
          category_={handleCategoryForm.category}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CategoryList;

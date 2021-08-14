import React, { useState, useEffect } from "react";
import Loading from "../Base/Loading";
import AddButton from "./AddButton";
import CategoryForm from "./CategoryForm";
import CategoryTile from "./CategoryTile";

const CategoryList = ({ categories }) => {
  const [categoryForm, setShowCategoryForm] = useState(false);

  const openForm = () => {
    setShowCategoryForm(true);
  };

  const closeForm = () => {
    setShowCategoryForm(false);
  };

  const makeUI = () => {
    return (
      <>
        <AddButton
          className="mb-5"
          name="Add Cagtegory"
          handleShowProduct={openForm}
        />
        <div className="row mt-5">
          {categories.map((category) => {
            return (
              <div className="col-lg-4 col-md-12 my-2">
                <CategoryTile
                  category_name={category.category_name}
                  image_url={category.image_url}
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
      {categoryForm && (
        <CategoryForm show={categoryForm} handleClose={closeForm} />
      )}
    </div>
  );
};

export default CategoryList;

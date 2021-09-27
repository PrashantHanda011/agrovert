import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CategoryModule from "../../modules/categoryModule";
import Loading from "../Base/Loading";
import AddButton from "./AddButton";
import CategoryForm from "./CategoryForm";



const CategoryList = () => {
  const [categories,setCategories] = useState(null)
  const [handleCategoryForm,setHandleCategoryForm] = useState({show:0,category:null})
  const categoryModule = new CategoryModule()
  const openForm = () => {
    setHandleCategoryForm({...handleCategoryForm,show:1});
  };

  const openUpdateForm = (category) => {
    setHandleCategoryForm({...handleCategoryForm,show:2,category:category});
  };

  const closeForm = () => {
    setHandleCategoryForm({...handleCategoryForm,show:0});
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    if (endIndex > startIndex) {
      result[startIndex].rank = endIndex + 1;
      for (let i = startIndex + 1; i <= endIndex; ++i) {
        result[i].rank -= 1;
      }
    } else if (startIndex - endIndex === 1) {
      result[startIndex].rank -= 1;
      result[endIndex].rank += 1;
    } else if (startIndex - endIndex > 1) {
      result[startIndex].rank = endIndex;
      for (let i = endIndex; i <= startIndex; ++i) {
        result[i].rank += 1;
      }
    }

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items_ = reorder(
      categories,
      result.source.index,
      result.destination.index
    );
    setCategories(items_);
    categoryModule.updateCategoriesInBulk(categories)
  };

  const addNewCategory = (newCategory) => {
    
      const newCategoryList = [...categories,newCategory]
      setCategories(newCategoryList)
    
  }

  const updateCategory = (id,updatedCategory) => {
    const newCategoryList = categories.map(category=>{
      if(category.id===id){
        category=updatedCategory
        category.id=id
      }
      return category
    })
    setCategories(newCategoryList)
  }

  const deleteCategory = (category_id) => {
    const newCategories = categories.filter(category=>{
      if(category.id!==category_id){
        return category
      }
    })
    setCategories(newCategories)
    categoryModule.deleteCategoryWithId(category_id)
  }
  const getCategories = async () => {
    const categoriesPromise = await categoryModule.fetchCategories()
    setCategories(categoriesPromise)
  }
  useEffect(()=>{
    getCategories();
  },[])
  const makeUI = () => {
    return (
      <>
        <AddButton
          className="mb-5"
          name="Add Cagtegory"
          handleShowProduct={openForm}
        />
        <div className="m-4">
          <div className="card shadow mb-4 mt-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Categories</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <DragDropContext onDragEnd={onDragEnd}>
                  <table className="table" width="100%">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th></th>
                        <th>Category Name</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <Droppable droppableId="droppable">
                      {(provided, snapshot) => (
                        <tbody
                          ref={provided.innerRef}
                          {...provided.droppableProps}>
                          {categories
                            .sort((a, b) =>
                              a.rank > b.rank ? 1 : a.rank < b.rank ? -1 : 0
                            )
                            .map((category, ind) => {
                              return (
                                <Draggable
                                  key={category.rank}
                                  draggableId={`${category.rank}-id`}
                                  index={ind}>
                                  {(provided, snapshot) => (
                                    <tr
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}>
                                      <td>{category.rank}</td>
                                      <td>
                                        <img
                                          src={category.image_url}
                                          height="100px"
                                          width="100px"
                                          alt="product image"
                                        />
                                      </td>
                                      <td>{category.category_name}</td>
                                      <td>
                                        <button
                                          className="btn btn-sm btn-success"
                                          onClick={() => {
                                         
                                            openUpdateForm(category);
                                          }}>
                                          Update
                                        </button>
                                      </td>
                                      <td>
                                        <button
                                          className="btn btn-sm btn-danger"
                                          onClick={() => {deleteCategory(category.id)}}>
                                          Delete
                                        </button>
                                      </td>
                                    </tr>
                                  )}
                                </Draggable>
                              );
                            })}
                        </tbody>
                      )}
                    </Droppable>
                  </table>
                </DragDropContext>
              </div>
            </div>
          </div>
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
          addNewCategory = {addNewCategory}
        />
      ) : (
        <></>
      )}
      {handleCategoryForm.show === 2 ? (
        <CategoryForm
          show={handleCategoryForm.show}
          handleClose={closeForm}
          category_={handleCategoryForm.category}
          updateCategory = {updateCategory}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CategoryList;

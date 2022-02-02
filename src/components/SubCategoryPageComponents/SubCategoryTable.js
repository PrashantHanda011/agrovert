import React, { useState, useEffect } from "react";
import AddButton from "./AddButton";
import SubCategoryModule from "../../modules/subCategoryModule";
import SubCategoryForm from "../../pages/Subcategories/SubCategoryForm";

const SubCategoryTable = ({ category_id }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [subCategoryIndex,setSubCategoryIndex] = useState(null);
  const [update,setUpdate] = useState(false)

  const subCategoryModule = new SubCategoryModule();
  useEffect(() => {
    const getSubCategories = async () => {
      await subCategoryModule.getSubCategories(category_id, setSubCategories);
    };
    getSubCategories();
  }, []);

  const deleteSubCategory = async (id,index) => {
    setSubCategories(subCategories.filter(subCategory=>{
      if(subCategory.id!==id){
        return subCategory
      }
    }))
    subCategoryModule.deleteSubCategory(id)
  };

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setUpdate(false)
    setSubCategoryIndex(null);
  };

  const makeUI = () => (
    <>
      <AddButton name="Add Subcategory" handleShowSubCategory={openForm} />
      <div className="m-4">
        <div className="card shadow mb-4 mt-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Sub Categories
            </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table" width="100%">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th></th>
                    <th>Category Id</th>
                    <th></th>
                    <th>Category Name</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {!subCategories || subCategories.length===0? (
                    <h1>No Data To Show</h1>
                  ) : (
                    subCategories.map((data,index) => (
                      <tr>
                        <td>{data.name}</td>
                        <td></td>
                        <td>{data.category_id}</td>
                        <td></td>
                        <td>{data.category_name}</td>
                        <td></td>
                        <td>
                          <button className="btn btn-sm btn-success" onClick={()=>{
                            setSubCategoryIndex(index)
                            setUpdate(true)
                            openForm()
                          }}>
                            Update
                          </button>
                        </td>
                        <td></td>
                        <td>
                          <button className="btn btn-sm btn-danger" onClick={()=>{
                            deleteSubCategory(data.id,index)
                          }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <>
      {subCategories && makeUI()}
      {showForm && subCategories.length > 0 && (
        <SubCategoryForm
          categoryId={category_id}
          categoryName={subCategories[0].category_name}
          showModal={showForm}
          closeModal={closeForm}
          subCategories={subCategories}
          setSubCategories={setSubCategories}
          update={update}
          currentSubCategoryName={subCategoryIndex===null?null:subCategories[subCategoryIndex].name}
          subCategoryId={subCategoryIndex===null?null:subCategories[subCategoryIndex].id}
        />
      )}
    </>
  );
};

export default SubCategoryTable;

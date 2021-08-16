import React, { useEffect, useState } from "react";
import { firestore } from "../../Firebase";
import Loading from "../Base/Loading";
import ProductTile from "./ProductTile";
import AddButton from "./AddButton";
import ProductForm from "./ProductForm";
const ProductList = ({ products, categories }) => {
  const [productForm, setShowProductForm] = useState(false);

  useEffect(() => {}, [products]);

  const openForm = () => {
    console.log(productForm);
    setShowProductForm(true);
  };

  const closeForm = () => {
    setShowProductForm(false);
  };

  const makeUI = () => {
    return (
      <>
        <AddButton
          className="mb-5"
          handleShowProduct={openForm}
          name="Add Products"
        />
        <div className="row mt-5">
          {products.map((product) => {
             console.log(product.file_name)
            return (
              <div className="col-xl-3 col-md-6 mb-2 my-2">
                <ProductTile
                  className="mt-3"
                  id={product.id}
                  productName={product.name}
                  imageUrl={product.image_url}
                  price={product.price}
                  description={product.description}
                  file_name={product.file_name}
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
      {/* <AddButton className="mb-5" handleShowProduct = {openForm}/> */}
      {products ? makeUI() : <Loading />}
      {productForm && (
        <ProductForm
          show={productForm}
          handleClose={closeForm}
          categories={categories}
        />
      )}
    </div>
  );
};

export default ProductList;

import React, { useEffect, useState } from "react";
import { firestore } from "../../Firebase";
import Loading from "../Base/Loading";
import ProductTile from "./ProductTile";
import AddButton from "./AddButton";
import ProductForm from "./ProductForm";
const ProductList = ({ products, categories }) => {
  const [productForm, setShowProductForm] = useState(0);
  const [product, setProduct] = useState(null);

  useEffect(() => {}, [products]);

  const openForm = () => {
    setShowProductForm(1);
  };

  const openUpdateForm = () => {
    setShowProductForm(2);
  };

  const closeForm = () => {
    setShowProductForm(0);
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
            return (
              <div className="col-xl-3 col-md-6 mb-2 my-2">
                <ProductTile
                  className="mt-3"
                  id={product.id}
                  productName={product.name}
                  imageUrl={product.image_url}
                  price={product.price}
                  description={product.description}
                  handleShowProduct={openUpdateForm}
                  setProduct={setProduct}
                  product={product}
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
      {products ? makeUI() : <Loading />}
      {productForm === 1 ? (
        <ProductForm
          show={productForm}
          handleClose={closeForm}
          categories={categories}
        />
      ) : (
        <></>
      )}
      {productForm === 2 ? (
        <ProductForm
          show={productForm}
          handleClose={closeForm}
          categories={categories}
          product={product}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductList;

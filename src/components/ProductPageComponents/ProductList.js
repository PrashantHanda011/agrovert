import React, { useEffect, useState } from "react";
import { firestore } from "../../Firebase";
import Loading from "../Base/Loading";
import ProductTile from "./ProductTile";
import AddButton from "./AddButton";
import ProductForm from "./ProductForm";
import ProductModule from "../../modules/productModule";
const ProductList = ({ categories, category }) => {
  const [productForm, setShowProductForm] = useState(0);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);

  const productModule = new ProductModule();

  useEffect(() => {
    const unsub = productModule.fetchProductsByCategory(
      category.id,
      setProducts
    );
  }, []);

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
        <div className="m-4">
          <div className="card shadow mb-4 mt-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Product</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table" width="100%">
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th></th>
                      <th>Product Name</th>
                      <th>MRP</th>
                      <th>Offered Price</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, ind) => {
                      return (
                        <tr>
                          <td>{ind + 1}</td>
                          <td>
                            <img
                              src={product.image_url}
                              height="100px"
                              width="100px"
                              alt="product image"
                            />
                          </td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.offered_price}</td>

                          <td>
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => {
                                setProduct(product);
                                openUpdateForm();
                              }}>
                              Update
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => {}}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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

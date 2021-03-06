import React, { useEffect, useState } from "react";
import Loading from "../Base/Loading";
import AddButton from "./AddButton";
import ProductForm from "./ProductForm";
import ProductModule from "../../modules/productModule";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ProductList = ({ categories, category }) => {
  const [productForm, setShowProductForm] = useState(0);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const [subCategories,setSubCategories] = useState(null);
  const productModule = new ProductModule();
  useEffect(() => {
    productModule.fetchProductsByCategory(
      category.id,
      setProducts
    );
    const getSubCategories = async () => {
      const data = await productModule.fetchSubCategories(category.id)
      console.log(data)
      setSubCategories(data)
    }
    getSubCategories()
  }, [category]);
  
  useEffect(()=>{},[products])

  const openForm = () => {
    setShowProductForm(1);
  };

  const openUpdateForm = () => {
    setShowProductForm(2);
  };

  const closeForm = () => {
    setShowProductForm(0);
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
      products,
      result.source.index,
      result.destination.index
    );
    setProducts(items_);
    productModule.updateProuductsInBulk(products)
  };

  const updateProduct = (id,updatedProduct) => {
    const newProductList = products.map(product=>{
      if(product.id===id){
        product=updatedProduct
        product.id=id
      }
      return product
    })
    setProducts(newProductList)
  }

  const addNewProduct = (newProduct) => {
    if(newProduct.category_id===category.id){
      const newProductList = [...products,newProduct]
      setProducts(newProductList)
    }
  }

  const deleteProduct = (id) =>{
    const newProducts = products.filter(product=>{
      if(product.id!==id){
        return product
      }
    })
    setProducts(newProducts)
    productModule.deleteProduct(id)
  }

  const changeProductStock = (id,value)=>{
    const newProducts = products.map(product=>{
      if(product.id===id){
        product.in_stock = value
      }
      return product
    })
    setProducts(newProducts)
    productModule.updateProductStock(id,value)
  }
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
                <DragDropContext onDragEnd={onDragEnd}>
                  <table className="table" width="100%">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th></th>
                        <th>Product Name</th>
                        <th>MRP</th>
                        <th>Offered Price</th>
                        <th>Quantity</th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <Droppable droppableId="droppable">
                      {(provided, snapshot) => (
                        <tbody
                          ref={provided.innerRef}
                          {...provided.droppableProps}>
                          {products
                            .sort((a, b) =>
                              a.rank > b.rank ? 1 : a.rank < b.rank ? -1 : 0
                            )
                            .map((product, ind) => {
                              return (
                                <Draggable
                                  key={product.rank}
                                  draggableId={`${product.rank}-id`}
                                  index={ind}>
                                  {(provided, snapshot) => (
                                    <tr
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}>
                                      <td>{product.rank}</td>
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
                                      <td>{product.quantity}</td>
                                      <td><button className="btn btn-sm btn-primary"
                                      onClick = {()=>{
                                        changeProductStock(product.id,!product.in_stock)
                                      }}
                                      >{product.in_stock===true?"Out of Stock":"In Stock"}</button></td>
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
                                          onClick={() => {deleteProduct(product.id)}}>
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
      {products!==null && subCategories!==null ? makeUI() :<Loading/>}
      {productForm === 1  && subCategories!==null ? (
        <ProductForm
          show={productForm}
          handleClose={closeForm}
          categories={categories}
          addNewProduct={addNewProduct}
          subCategories = {subCategories}
        />
      ) : (
        <></>
      )}
      {productForm === 2 && subCategories!==null? (
        <ProductForm
          show={productForm}
          handleClose={closeForm}
          categories={categories}
          product={product}
          updateProduct={updateProduct}
          subCategories = {subCategories}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductList;

import React, { createContext, useReducer } from "react";
import reducer from "./AppReducer";
import {
  deleteProductWithId,
  fetchCategories,
  fetchOrders,
  fetchProducts,
  updateProductWithId,
} from "../utils/utils";
// import { db } from './Firebase'

// console.log(db)
const initialState = {
  toggle: false,
  user: null,
  products: [],
  pincodes: [],
  orders: [],
};

export const AppContext = createContext(initialState);

export const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function toggleSideBar(state_) {
    dispatch({
      type: "TOGGLE",
      payload: state_,
    });
  }

  function addUser(user) {
    dispatch({
      type: "ADD_USER",
      payload: user,
    });
  }

  function addProduct(product) {
    dispatch({
      type: "ADD_PRODUCT",
      payload: product,
    });
  }

  function addCategory(category) {
    dispatch({
      type: "ADD_CATEGORY",
      payload: category,
    });
  }

  async function getProductsFromBackend() {
    let products = await fetchProducts();
    dispatch({
      type: "GET_PRODUCTS",
      payload: products,
    });
  }
  async function getCategoriesFromBackend() {
    let categories = await fetchCategories();
    dispatch({
      type: "GET_CATEGORIES",
      payload: categories,
    });
  }

  async function deleteProductWithGivenId(id) {
    await deleteProductWithId(id);

    dispatch({
      type: "DELETE_PRODUCT",
      payload: id,
    });
  }

  async function updateProductWithGivenId(id,product) {
    await updateProductWithId(id,product)
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: {id,product},
    });
  }

  // async function getOrders(){
  //   await fetchOrders()
  //   dispatch({
  //     type: ""
  //   })
  // }

  return (
    <AppContext.Provider
      value={{
        appState: state,
        addCategory,
        addProduct,
        addUser,
        getProductsFromBackend,
        getCategoriesFromBackend,
        toggleSideBar,
        deleteProductWithGivenId,
        updateProductWithGivenId,
      }}>
      {children}
    </AppContext.Provider>
  );
};

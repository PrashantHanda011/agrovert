import React, { useState,useEffect } from "react";
import {  Tab, Tabs } from "react-bootstrap";
import styles from "./productpagecomponents.module.css";

import ProductList from "./ProductList";

import { fetchCategories, fetchProducts } from "../../utils/utils";
import CategoryList from "./CategoryList";
import { useContext } from "react";
import { AppContext } from "../../Context";

const TabComponent = () => {
  const [products,setProducts] = useState(null)
  const [categories,setCategories] = useState(null)

  

  useEffect(()=>{
      const preload = async () =>{
        const products_ = await fetchProducts()
        const categories_ = await fetchCategories()
        setProducts(products_)
        setCategories(categories_)
       
      }
      preload()
      console.log(products,categories)
  },[])
  const [key, setKey] = useState("Products");
  return (
    <div className="container mx-3 my-3">
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 mx-3">
        <Tab eventKey="Products" title="Products">
          <ProductList products={products} categories={categories} />
        </Tab>
        <Tab eventKey="Categories" title="Categories">
          <CategoryList categories={categories}/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabComponent;

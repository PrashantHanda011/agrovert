import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import CategoryModule from "../../modules/categoryModule";
import ProductModule from "../../modules/productModule";
import Loading from "../Base/Loading";
import ProductList from "./ProductList";

const TabComponent = ({categories}) => {
   
   const [category,setCategory] = useState({})
  return (
    
    <div className="container mx-2 my-2">
      {categories?(
        
        <>
        <div>Select Category</div>
        <select
          className="ml-2 mb-3 form-control"
          width="10%"
          onChange={(e) => {
            e.preventDefault()
            setCategory(categories[e.target.value]);
          }}
          placeholder="Category"
          value={category.category_name}>
          <option>{Object.keys(category).length>0?category.category_name:"Select"}</option>
          {categories &&
            categories.map((category, index) => (
              <option id={index} value={index}>
                {category.category_name}
              </option>
            ))}
        </select>
         {Object.keys(category).length>0 &&  <ProductList categories={categories} category={category}/>}
        </>
          ):<Loading/>}
    </div>
  );
};

export default TabComponent;

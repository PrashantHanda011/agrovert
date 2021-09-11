import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import CategoryModule from "../../modules/categoryModule";
import ProductModule from "../../modules/productModule";
import Loading from "../Base/Loading";
import ProductList from "./ProductList";

const TabComponent = ({categories}) => {
   console.log(categories)
   const [category,setCategory] = useState(categories[0])
  useEffect(()=>{
  },[categories])

  console.log(category)
  return (
    
    <div className="container mx-2 my-2">
      {categories?(
        
        <>
        <div>Select Category</div>
        <select
          className="ml-2 form-control"
          width="10%"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          placeholder="Category"
          value={category}>
          <option>Select</option>
          {categories &&
            categories.map((category, index) => (
              <option id={index} value={category}>
                {category.category_name}
              </option>
            ))}
        </select>
         {category!==null &&  <ProductList categories={categories} category={category}/>}
        </>
          ):<Loading/>}
    </div>
  );
};

export default TabComponent;

import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import CategoryModule from "../../modules/categoryModule";
import ProductModule from "../../modules/productModule";
import Loading from "../Base/Loading";
import ProductList from "./ProductList";

const TabComponent = () => {
  const [key, setKey] = useState("");
  const [categories,setCategories] = useState(null)
  const categoryModule =  new CategoryModule()

  
  useEffect(()=>{
    
    const getCategories = async () => {
      const result = await categoryModule.fetchCategories().then(data=>data)
      setCategories(result)
      setKey(result[0].id)
    }
    getCategories()
  },[])

  
  return (
    <div className="container mx-2 my-2">
      {categories?(
        
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 mx-3">
        {categories.map((cate,index)=>{
          return (<Tab key={index} eventKey={cate.id} title={cate.category_name}>
          <ProductList products={[]} categories={categories} categoryId={cate.id}/>
          </Tab>)
        })}
        
      </Tabs>):<Loading/>}
    </div>
  );
};

export default TabComponent;

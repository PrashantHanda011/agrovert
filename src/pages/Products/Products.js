import React, { useState, useContext, useEffect } from "react";
import Base from "../Base";
import { withRouter } from "react-router-dom";
import TabComponent from "../../components/ProductPageComponents/TabComponent";
import CategoryModule from "../../modules/categoryModule";
import Loading from "../../components/Base/Loading";

const Products = () => {
  const [categories,setCategories] = useState(null)
  const categoryModule = new CategoryModule()
  useEffect(()=>{
    const getCategories = async () => {
      const result = await categoryModule.fetchCategories().then(data=>data)
      setCategories(result)      
    }
    getCategories()
  },[])
  return (
    <Base>
      {categories?(<div className="container-fluid">
        <TabComponent categories={categories}/>
      </div>):<Loading/>}
    </Base>
  );
};

export default withRouter(Products);
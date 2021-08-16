import React, { useState, useContext, useEffect } from "react";
import Base from "../Base";
import { withRouter } from "react-router-dom";
import TabComponent from "../../components/ProductPageComponents/TabComponent";

const Products = () => {
  return (
    <Base>
      <div className="container-fluid">
        <TabComponent />
      </div>
    </Base>
  );
};

export default withRouter(Products);
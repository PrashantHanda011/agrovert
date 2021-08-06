import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";
import { useContext } from "react";
import { AppContext } from "../../Context";

const TabComponent = () => {
  const { appState } = useContext(AppContext);

  useEffect(() => {}, [appState.products]);

  const [key, setKey] = useState("Products");
  return (
    <div className="container mx-3 my-3">
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 mx-3">
        <Tab eventKey="Products" title="Products">
          <ProductList
            products={appState.products}
            categories={appState.categories}
          />
        </Tab>
        <Tab eventKey="Categories" title="Categories">
          <CategoryList categories={appState.categories} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabComponent;

import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";


const TabComponent = () => {

  const [key, setKey] = useState("Products");
  return (
    <div className="container mx-2 my-2">
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 mx-3">
        <Tab eventKey="Products" title="Products">
          
        </Tab>
        <Tab eventKey="Categories" title="Categories">
          
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabComponent;

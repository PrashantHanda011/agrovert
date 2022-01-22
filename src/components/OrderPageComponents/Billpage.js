import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ProductModule from "../../modules/productModule";
import MakeBill from "./MakeBill";

const Billpage = ({ show, handleClose, order, user }) => {
  const [products, setProducts] = useState(null);
  const productModule = new ProductModule();

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await productModule.fetchProductsAsObject();
      setProducts(fetchedProducts);
    };
    getProducts();
  }, []);

  return (
    <>
      {products && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Bill</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MakeBill order={order} user={user} products={products} />
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Billpage;

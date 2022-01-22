import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import Loading from "../Base/Loading";
import ProductModule from '../../modules/productModule'


const FullOrderPage = ({ order, user, show, handleClose }) => {
  const [products, setProducts] = useState(null);
  const productModule = new ProductModule()
  useEffect(() => {
   const getProducts = async () => {
     const fetchedProducts = await productModule.fetchProductsAsObject()
     setProducts(fetchedProducts)
   }
   getProducts()
  }, []);
  const createOrderDetail = () => {
    return (
      <div>
        <h4>User Details</h4>
        <hr />
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Phone No.:</strong> {user.phone_number}
        </p>
        <p>
          <strong>Address:</strong> {order.delivery_address.street_address}, near {order.delivery_address.landmark}, {order.delivery_address.district}, {order.delivery_address.state} -{" "}
          {order.delivery_address.pin_code}
        </p>
        <p>
          <strong>Ordered At:</strong> {order.timestamp.toDate().toDateString()} {order.timestamp.toDate().toTimeString()}
        </p>
        <hr />
        <h4>Products</h4>
        
        {products? <div className="table-responsive">
        <table className="table">
            <thead>
                <tr>
                    <th>
                        Product Name
                    </th>
                    <th>
                        Quantity
                    </th>
                    <th>
                        Offered Price
                    </th>
                    <th>
                        Amount
                    </th>
                </tr>
            </thead>
            <tbody>
                {order.products.map((product,index)=>{
                    
                    return (
                        <tr>
                            <td>{products[product.product_id].name}</td>
                            <td>{order.products[index].quantity}</td>
                            <td>₹ {products[product.product_id].offered_price}</td>
                            <td>₹ {order.products[index].quantity*products[product.product_id].offered_price}</td>
                        </tr>
                    )
                })}
            </tbody>
            <thead>
                <tr>
                    <th>Total: </th>
                    <th></th>
                    <th></th>
                    <th>₹ {order.amount.toFixed(2)}</th>
                </tr>
            </thead>
        </table>
        </div>:<Loading/>}
      </div>
    );
  };
  return (
    <Modal show={show} onHide={()=>{handleClose();}} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>{createOrderDetail()}</Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default FullOrderPage;

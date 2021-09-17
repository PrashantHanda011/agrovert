import React, { useState, useEffect } from "react";
import { Badge, Button } from "react-bootstrap";
import FullOrderPage from "./FullOrderPage";
import OrderModule from '../../modules/orderModule';
import CustomerModule from "../../modules/customerModule";

const TableRow = ({ Order, index }) => {
  const [order_, setOrder] = useState(Order);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const orderModule = new OrderModule();
  const customerModule =  new CustomerModule()

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const approveOrder = () => {
    setOrder({ ...order_, status: "DELIVERED" });
    
    orderModule.updateOrderStatus(order_.id, "DELIVERED");
    customerModule.updateCustomerTotalAmount(order_.user_id,order_.amount)
  };
  const cancelOrder = () => {
    setOrder({ ...order_, status: "CANCELLED" });
    
    orderModule.updateOrderStatus(order_.id, "CANCELLED");
  };
  useEffect(() => {
    const getUser = async (id) => {
      const data = await orderModule.getUserFromUserId(id);
      setUser(data);
    };
    getUser(order_.user_id);
  }, []);

  useEffect(() => {
    setOrder(Order);
  }, [Order]);
  return (
    <>
      {user && (
        <tr className="align-items-center">
          <td>{index + 1}</td>
          <td>{order_.timestamp.toDate().toDateString()}</td>
          <td>{user.name}</td>
          <td>{user.phone_number}</td>
          <td>₹{order_.amount.toFixed(2)}</td>
          <td>
            <Badge
              className={
                order_.status === "DELIVERED"
                  ? "badge-success"
                  : order_.status === "CANCELLED"
                  ? "badge-danger"
                  : "badge-primary"
              }>
              {order_.status}
            </Badge>
          </td>
          <td>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                handleOpen();
              }}>
              Show
            </button>
          </td>
          <td>
            <button
              className="btn btn-sm btn-success"
              disabled={order_.status === "DELIVERED" ? true : false}
              onClick={() => {
                approveOrder();
              }}>
              Approve
            </button>
          </td>
          <td>
            <button
              className="btn btn-sm btn-danger"
              disabled={order_.status === "CANCELLED" ? true : false}
              onClick={() => {
                cancelOrder();
              }}>
              Cancel
            </button>
          </td>
        </tr>
      )}
      {open && (
        <FullOrderPage
          order={order_}
          user={user}
          show={open}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default TableRow;

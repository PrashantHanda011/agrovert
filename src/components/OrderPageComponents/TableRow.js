import React, { useState, useEffect } from "react";
import { Badge, Button } from "react-bootstrap";
import FullOrderPage from "./FullOrderPage";
import OrderModule from '../../modules/orderModule';
import CustomerModule from "../../modules/customerModule";
import { firestore } from "../../Firebase";
import ConfirmModal from "./ConfirmModal";
import ProductModule from "../../modules/productModule";
import Billpage from "./Billpage";

const TableRow = ({ Order, index }) => {
  const [order_, setOrder] = useState(Order);

  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openBill,setOpenBill] = useState(false);
  const [users,setUsers] = useState(null)
  const [actionType,setActionType] = useState("")
  const [products,setProducts] = useState({})
  const orderModule = new OrderModule();
  const productModule = new ProductModule()
  const customerModule =  new CustomerModule()

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenBill = () => {
    setOpenBill(true);
  };
  const handleCloseBill = () => {
    setOpenBill(false);
  };

  
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const acceptOrder = () => {
    setOrder({ ...order_, status: "ACCEPTED" });
    
    orderModule.updateOrderStatus(order_.id, "ACCEPTED");
    customerModule.updateCustomerTotalAmount(order_.user_id,order_.amount)
  };
  const cancelOrder = () => {
    setOrder({ ...order_, status: "CANCELLED" });
    
    orderModule.updateOrderStatus(order_.id, "CANCELLED");
  };
  const pendingOrder = () => {
    setOrder({ ...order_, status: "PENDING" });
    
    orderModule.updateOrderStatus(order_.id, "CANCELLED");
  };
  const deliverOrder = () => {
    setOrder({...order_,status:"DELIVERED"});
    orderModule.updateOrderStatus(order_.id, "DELIVERED");
  }
  useEffect(() => {
    const getUsers = async () => {
      const users_ = await firestore.collection("users").get()
      let data = {}
      users_.docs.forEach(doc=>{
        data[doc.id] = doc.data()
      })
      setUsers(data);
    };
    const getProducts = async () => {
      const fetchedProducts = await productModule.fetchProductsAsObject()
      setProducts(fetchedProducts)
    }
    getUsers()
    getProducts()
  }, [Order]);

  useEffect(() => {
    setOrder(Order);
  }, [Order]);
  return (
    <>
      {users && products && (
        <tr className="align-items-center">
          <td>{index + 1}</td>
          <td>{order_.timestamp.toDate().toDateString()}</td>
          <td>{users[order_.user_id].name}</td>
          <td>{users[order_.user_id].phone_number}</td>
          <td>₹{order_.amount.toFixed(2)}</td>
          <td>
            <Badge pill
              className={
                order_.status === "DELIVERED"
                  ? "badge-success bg-gradient-success"
                  : order_.status === "CANCELLED"
                  ? "badge-danger badge-success bg-gradient-danger"
                  : order_.status ==='ACCEPTED'
                  ? "badge-warning bg-gradient-warning"
                  : "badge-primary badge-success bg-gradient-primary"
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
              className="btn btn-sm btn-warning"
              onClick={() => {
                handleOpenConfirm()
              }}>
              Change Status
            </button>
          </td>
          <td>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                handleOpenBill()
              }}>
              View Bill 
            </button>
          </td>
        </tr>
      )}
      {open && (
        <FullOrderPage
          order={order_}
          user={users[order_.user_id]}
          show={open}
          handleClose={handleClose}
        />
      )}
      {openConfirm && <ConfirmModal
          actions={[pendingOrder,acceptOrder,cancelOrder,deliverOrder]}
          show={openConfirm}
          handleClose={handleCloseConfirm}
          orderState={order_.status}
        />}
      {openBill && <Billpage
      show={openBill}
      handleClose={handleCloseBill}
      order={order_}
      user={users[order_.user_id]}
      />}
    </>
  );
};

export default TableRow;

import React, { useState, useEffect } from "react";
import { Badge, Button } from "react-bootstrap";
import FullOrderPage from "./FullOrderPage";
import OrderModule from '../../modules/orderModule';
import CustomerModule from "../../modules/customerModule";
import { firestore } from "../../Firebase";
import ConfirmModal from "./ConfirmModal";

const TableRow = ({ Order, index }) => {
  const [order_, setOrder] = useState(Order);

  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [users,setUsers] = useState(null)
  const [actionType,setActionType] = useState("")
  const orderModule = new OrderModule();
  const customerModule =  new CustomerModule()

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
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
    const getUsers = async () => {
      const users_ = await firestore.collection("users").get()
      let data = {}
      users_.docs.forEach(doc=>{
        data[doc.id] = doc.data()
      })
      setUsers(data);
    };
    getUsers()
  }, [Order]);

  useEffect(() => {
    setOrder(Order);
  }, [Order]);
  return (
    <>
      {users && (
        <tr className="align-items-center">
          <td>{index + 1}</td>
          <td>{order_.timestamp.toDate().toDateString()}</td>
          <td>{users[order_.user_id].name}</td>
          <td>{users[order_.user_id].phone_number}</td>
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
                handleOpenConfirm()
                setActionType("approve")
              
              }}>
              Approve
            </button>
          </td>
          <td>
            <button
              className="btn btn-sm btn-danger"
              disabled={order_.status === "CANCELLED" ? true : false}
              onClick={() => {
                handleOpenConfirm()
                setActionType("cancel")
                
              }}>
              Cancel
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
      {openConfirm && 
      actionType==="approve"?
      (
        <ConfirmModal
          action={approveOrder}
          show={openConfirm}
          handleClose={handleCloseConfirm}
        />
      ):
      actionType==="cancel"?
      (
        <ConfirmModal
          action={cancelOrder}
          show={openConfirm}
          handleClose={handleCloseConfirm}
        />
      ):<></>}
    </>
  );
};

export default TableRow;

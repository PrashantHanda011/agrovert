import React, { useState,useEffect } from "react";
import Base from "../Base";
import OrderTable from "../../components/OrderPageComponents/OrderTable";
import Loading from "../../components/Base/Loading";
import FullOrderPage from "../../components/OrderPageComponents/FullOrderPage";
import { Pagination } from "react-bootstrap";
import OrderModule from '../../modules/orderModule'
import OrderPageReusable from "../../components/OrderPageComponents/OrderPageReusable";
import { firestore } from "../../Firebase";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [open, setOpen] = useState(false);
  const [play,setPlay] = useState(false)
  const orderModule = new OrderModule()

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  
  useEffect(() => {
    const unsubscribe = orderModule.fetchOrders(setOrders,setPlay)
    return () => unsubscribe()
  }, []);
 



  return (
    <Base>
      {!orders &&  <Loading />}
      {orders &&  (
        <>
        <OrderPageReusable orders={orders
          .filter(order=>order.status!=="CART")
          .filter(order=>!Object.keys(order).includes("read"))
        } 
        name="Pending Orders"
        play={play}
        setPlay={setPlay}
          />
        <OrderPageReusable orders={orders
          .filter(order=>order.status!=="CART")
          .filter(order=>order.read===true)
        }
        name="Order History"
          />
        </>
      )}
    </Base>
  );
};

export default Orders;

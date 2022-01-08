import React, { useState,useEffect } from "react";
import Base from "../Base";
import Loading from "../../components/Base/Loading";
import OrderModule from '../../modules/orderModule'
import OrderPageReusable from "../../components/OrderPageComponents/OrderPageReusable";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [play,setPlay] = useState(false)
  const orderModule = new OrderModule()

  
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
          .filter(order=>order.status==="PENDING")
        } 
        name="Pending Orders"
        play={play}
        setPlay={setPlay}
          />
        <OrderPageReusable orders={orders
          .filter(order=>order.status!=="CART" && order.status!=='PENDING')
        }
        name="Order History"
          />
        </>
      )}
    </Base>
  );
};

export default Orders;
